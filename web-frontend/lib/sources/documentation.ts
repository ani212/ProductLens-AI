// ═══════════════════════════════════════════════
// Documentation Extractor — discovers and parses product docs
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';
import { fetchPageContent, fetchFirstSuccessful, contentToEvidence, guessProductUrls } from './web-extractor';

/**
 * Discovers documentation URLs and extracts feature/integration information.
 * Returns both raw documentation text evidence and a list of extracted features.
 */
export async function fetchDocumentation(
  productName: string,
  websiteBase: string
): Promise<{ evidence: RawEvidence[]; features: string[]; docsUrl: string }> {
  const urls = guessProductUrls(productName, websiteBase);
  const evidence: RawEvidence[] = [];
  const features: string[] = [];

  try {
    // 1. Try to find the docs landing page
    const docsResult = await fetchFirstSuccessful(urls.docs);

    if (docsResult.content) {
      const docsEvidence = contentToEvidence(
        docsResult.content,
        'Documentation',
        docsResult.url,
        'documentation'
      );
      evidence.push(...docsEvidence);

      // Extract features from documentation text
      const extractedFeatures = extractFeaturesFromText(docsResult.content);
      features.push(...extractedFeatures);

      return { evidence, features, docsUrl: docsResult.url };
    }

    // 2. Fallback: try the homepage for feature information
    const homepageContent = await fetchPageContent(urls.homepage);
    if (homepageContent) {
      const homeEvidence = contentToEvidence(
        homepageContent,
        'Official Website',
        urls.homepage,
        'feature'
      );
      evidence.push(...homeEvidence);

      const extractedFeatures = extractFeaturesFromText(homepageContent);
      features.push(...extractedFeatures);
    }

    return { evidence, features, docsUrl: '' };
  } catch (err) {
    console.warn(`[documentation] Failed to fetch docs for ${productName}:`, err);
    return { evidence: [], features: [], docsUrl: '' };
  }
}

/**
 * Extracts feature names from documentation text.
 * Looks for common patterns like headings, feature lists, etc.
 */
function extractFeaturesFromText(text: string): string[] {
  const features: string[] = [];
  const lines = text.split('\n');

  // Feature-related keywords that indicate a feature section
  const featureKeywords = [
    'integration', 'api', 'automation', 'collaboration', 'analytics',
    'reporting', 'dashboard', 'workflow', 'notification', 'permission',
    'security', 'sso', 'saml', 'oauth', 'webhook', 'plugin',
    'template', 'import', 'export', 'sync', 'mobile', 'offline',
    'real-time', 'ai', 'machine learning', 'custom field', 'custom view',
    'timeline', 'gantt', 'kanban', 'calendar', 'roadmap', 'sprint',
    'backlog', 'milestone', 'label', 'filter', 'search', 'comment',
    'mention', 'attachment', 'version control', 'audit log', 'encryption',
    'compliance', 'gdpr', 'soc', 'hipaa', 'enterprise', 'admin',
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    // Look for heading-like lines that mention features
    if (trimmed.length >= 5 && trimmed.length <= 100) {
      const lower = trimmed.toLowerCase();
      for (const keyword of featureKeywords) {
        if (lower.includes(keyword) && !features.includes(trimmed)) {
          features.push(trimmed);
          break;
        }
      }
    }
  }

  return features.slice(0, 50); // Cap at 50 features
}
