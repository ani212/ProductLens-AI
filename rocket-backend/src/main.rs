#[macro_use] extern crate rocket;

use rocket::serde::json::{Json, Value};
use rocket::serde::Serialize;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    service: String,
}

#[get("/health")]
fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        service: "productlens-rocket-api".to_string(),
    })
}

#[catch(404)]
fn not_found() -> Value {
    rocket::serde::json::serde_json::json!({
        "error": "Resource not found"
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![health])
        .register("/", catchers![not_found])
}
