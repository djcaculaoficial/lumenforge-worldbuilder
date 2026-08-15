//! Lumenforge Worldbuilder desktop shell: intentionally small native surface.
//! UI logic lives in the local React application; this host only provides bounded project-file operations.

use std::fs;
use std::path::{Path, PathBuf};
use tauri::Manager;

fn validate_project_path(path: &Path) -> Result<(), String> {
    if path.extension().and_then(|extension| extension.to_str()) != Some("json") {
        return Err("Worldbuilder projects must use the .json extension.".into());
    }
    Ok(())
}

#[tauri::command]
fn read_project(project_path: String) -> Result<String, String> {
    let path = PathBuf::from(project_path);
    validate_project_path(&path)?;
    fs::read_to_string(path).map_err(|error| format!("Unable to read the project: {error}"))
}

#[tauri::command]
fn write_project_atomic(project_path: String, content: String) -> Result<(), String> {
    if content.len() > 20_000_000 {
        return Err("Project data exceeds the current 20 MB safety limit.".into());
    }
    serde_json::from_str::<serde_json::Value>(&content)
        .map_err(|_| "Project data is not valid JSON.".to_string())?;
    let path = PathBuf::from(project_path);
    validate_project_path(&path)?;
    let parent = path
        .parent()
        .ok_or_else(|| "Project path has no parent folder.".to_string())?;
    fs::create_dir_all(parent)
        .map_err(|error| format!("Unable to create the project folder: {error}"))?;
    let temporary_path = path.with_extension("json.pending");
    fs::write(&temporary_path, content)
        .map_err(|error| format!("Unable to stage project data: {error}"))?;
    fs::rename(&temporary_path, &path)
        .map_err(|error| format!("Unable to commit project data: {error}"))
}

#[tauri::command]
fn desktop_status() -> serde_json::Value {
    serde_json::json!({
        "host": "tauri",
        "product": "Lumenforge Worldbuilder",
        "productLine": "worldbuilder-0.4",
        "projectStorage": "local-files",
        "network": "not-required",
        "shellVersion": env!("CARGO_PKG_VERSION"),
        "sourceRevision": option_env!("LUMENFORGE_SOURCE_REVISION").unwrap_or("local-build"),
        "buildChannel": option_env!("LUMENFORGE_BUILD_CHANNEL").unwrap_or("development")
    })
}

fn validate_export_name(name: &str) -> Result<String, String> {
    let name = name.trim();
    if name.is_empty() || name.len() > 80 {
        return Err("Choose an export name between 1 and 80 characters.".into());
    }
    if !name.chars().all(|character| {
        character.is_ascii_alphanumeric()
            || character == '-'
            || character == '_'
            || character == ' '
    }) {
        return Err(
            "Export names may contain letters, numbers, spaces, hyphens, and underscores only."
                .into(),
        );
    }
    Ok(name.to_string())
}

#[tauri::command]
fn export_game_package(
    app: tauri::AppHandle,
    content: String,
    export_name: String,
) -> Result<String, String> {
    if content.len() > 20_000_000 {
        return Err("Game package data exceeds the current 20 MB safety limit.".into());
    }
    let package: serde_json::Value = serde_json::from_str(&content)
        .map_err(|_| "Game package data is not valid JSON.".to_string())?;
    if package.get("format").and_then(|value| value.as_str())
        != Some("lumenforge-worldbuilder-game-package")
    {
        return Err("This export is not a recognised Lumenforge Worldbuilder game package.".into());
    }
    let name = validate_export_name(&export_name)?;
    let documents = app
        .path()
        .document_dir()
        .or_else(|_| app.path().home_dir())
        .map_err(|error| format!("Unable to find a local export folder: {error}"))?;
    let folder = documents
        .join("Lumenforge Worldbuilder Exports")
        .join(&name);
    fs::create_dir_all(&folder)
        .map_err(|error| format!("Unable to create the export folder: {error}"))?;
    let final_path = folder.join("game.worldbuilder.json");
    let temporary_path = folder.join("game.worldbuilder.pending");
    fs::write(&temporary_path, content)
        .map_err(|error| format!("Unable to stage the game package: {error}"))?;
    fs::rename(&temporary_path, &final_path)
        .map_err(|error| format!("Unable to commit the game package: {error}"))?;
    Ok(format!(
        "Validated game package written to {}",
        folder.display()
    ))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_project,
            write_project_atomic,
            desktop_status,
            export_game_package
        ])
        .run(tauri::generate_context!())
        .expect("error while running Lumenforge Worldbuilder desktop shell");
}
