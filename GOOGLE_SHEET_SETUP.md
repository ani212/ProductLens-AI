# Google Sheet Database Setup Guide 📊

To store user credentials, search history, and favorites inside a Google Sheet, follow these simple steps to set up a serverless webhook database.

---

## Step 1: Create a Google Sheet & Open Apps Script
1. Create a brand-new blank sheet at [sheets.google.com](https://sheets.google.com).
2. Give the sheet a name (e.g., `ProductLens AI Database`).
3. In the top menu, go to **Extensions** ➜ **Apps Script**.

---

## Step 2: Paste the Database Code
Delete any default code in the editor and paste the JavaScript code block below:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Wait up to 10 seconds for concurrent writes
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Lock timeout: server busy" }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var payload = JSON.parse(e.postData.contents);
    var action = payload.action;
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Auto-initialize required sheets
    initializeSheets(sheet);

    var responseData = {};

    if (action === "register") {
      responseData = registerUser(sheet, payload.identifier, payload.password);
    } else if (action === "login") {
      responseData = loginUser(sheet, payload.identifier, payload.password);
    } else if (action === "addHistory") {
      responseData = addHistory(sheet, payload.userId, payload.products, payload.persona, payload.objective);
    } else if (action === "toggleFavorite") {
      responseData = toggleFavorite(sheet, payload.userId, payload.products, payload.persona, payload.objective, payload.isFavorite);
    } else if (action === "getData") {
      responseData = getUserData(sheet, payload.userId);
    } else {
      responseData = { error: "Unknown action: " + action };
    }

    return ContentService.createTextOutput(JSON.stringify(responseData))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Ensure tables exist with headers
function initializeSheets(sheet) {
  if (!sheet.getSheetByName("Users")) {
    var s = sheet.insertSheet("Users");
    s.appendRow(["User ID", "Identifier", "Password Hash", "Created At"]);
  }
  if (!sheet.getSheetByName("History")) {
    var s = sheet.insertSheet("History");
    s.appendRow(["User ID", "Products", "Persona", "Objective", "Timestamp"]);
  }
  if (!sheet.getSheetByName("Favorites")) {
    var s = sheet.insertSheet("Favorites");
    s.appendRow(["User ID", "Products", "Persona", "Objective", "Timestamp"]);
  }
}

function registerUser(sheet, identifier, passwordHash) {
  var userSheet = sheet.getSheetByName("Users");
  var data = userSheet.getDataRange().getValues();
  
  // Check if user already exists
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === identifier) {
      return { error: "User identifier already registered" };
    }
  }

  var userId = "usr_" + Math.random().toString(36).substr(2, 9);
  userSheet.appendRow([userId, identifier, passwordHash, new Date().toISOString()]);
  return { success: true, userId: userId, identifier: identifier };
}

function loginUser(sheet, identifier, passwordHash) {
  var userSheet = sheet.getSheetByName("Users");
  var data = userSheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === identifier) {
      if (data[i][2] === passwordHash) {
        return { success: true, userId: data[i][0], identifier: identifier };
      } else {
        return { error: "Incorrect password" };
      }
    }
  }
  return { error: "User not found" };
}

function addHistory(sheet, userId, products, persona, objective) {
  var histSheet = sheet.getSheetByName("History");
  histSheet.appendRow([userId, products, persona, objective, new Date().toISOString()]);
  return { success: true };
}

function toggleFavorite(sheet, userId, products, persona, objective, isFavorite) {
  var favSheet = sheet.getSheetByName("Favorites");
  var data = favSheet.getDataRange().getValues();

  // Find if exists
  var foundIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === userId && data[i][1] === products) {
      foundIndex = i + 1; // row index in sheet (1-based, +1 for loop offset)
      break;
    }
  }

  if (isFavorite) {
    if (foundIndex === -1) {
      favSheet.appendRow([userId, products, persona, objective, new Date().toISOString()]);
    }
  } else {
    if (foundIndex !== -1) {
      favSheet.deleteRow(foundIndex);
    }
  }
  return { success: true };
}

function getUserData(sheet, userId) {
  var histSheet = sheet.getSheetByName("History");
  var favSheet = sheet.getSheetByName("Favorites");
  
  var histData = histSheet.getDataRange().getValues();
  var favData = favSheet.getDataRange().getValues();

  var history = [];
  for (var i = 1; i < histData.length; i++) {
    if (histData[i][0] === userId) {
      history.push({
        products: histData[i][1],
        persona: histData[i][2],
        objective: histData[i][3],
        timestamp: histData[i][4]
      });
    }
  }

  var favorites = [];
  for (var i = 1; i < favData.length; i++) {
    if (favData[i][0] === userId) {
      favorites.push({
        products: favData[i][1],
        persona: favData[i][2],
        objective: favData[i][3],
        timestamp: favData[i][4]
      });
    }
  }

  return { history: history, favorites: favorites };
}
```

---

## Step 3: Deploy the Script as a Web App
1. In the Apps Script editor, click **Deploy** (top right) ➜ **New deployment**.
2. Click the gear icon (Select type) and choose **Web app**.
3. Configure the settings:
   - **Description**: `ProductLens AI Webhook Backend`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Note: This is required so your Next.js server routes can post data to it).*
4. Click **Deploy**.
5. Copy the generated **Web app URL** (starts with `https://script.google.com/macros/s/...`).

---

## Step 4: Configure environment variables
Add the copied URL to your local [.env.local](file:///e:/WORK/Antigravity/ProductLensAI/.env.local) file:

```env
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXXXX/exec
```
*(If this variable is not defined or is blank, the application automatically falls back to secure browser local storage).*
