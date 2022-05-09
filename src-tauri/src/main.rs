#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{
  fs::{self, OpenOptions},
  path::{Path, PathBuf},
};

use uuid::Uuid;

const LOCAL_STORAGE_DIR: &str = "LocalStorage";
const TODO_LISTS_FILE: &str = "todo_lists.json";

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      setup(app);
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      read_todo_lists,
      write_todo_lists,
      get_uuid
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn setup(app: &mut tauri::App) {
  if let Some(app_dir) = app.path_resolver().app_dir() {
    create_app_directories(&app_dir);
    create_local_storage_files(&app_dir);
  }
}

fn create_app_directories(app_dir: &PathBuf) {
  if !Path::new(app_dir).exists() {
    fs::create_dir_all(app_dir.join(LOCAL_STORAGE_DIR))
      .expect("Could not create required application directories")
  }
}

fn create_local_storage_files(app_dir: &PathBuf) {
  let path = app_dir.join(LOCAL_STORAGE_DIR).join(TODO_LISTS_FILE);

  if !path.exists() {
    OpenOptions::new()
      .write(true)
      .create_new(true)
      .open(path)
      .expect("Could not create required local storage files");
  }
}

#[tauri::command]
fn read_todo_lists(app_handle: tauri::AppHandle) -> String {
  if let Some(app_dir) = app_handle.path_resolver().app_dir() {
    return fs::read_to_string(app_dir.join(LOCAL_STORAGE_DIR).join(TODO_LISTS_FILE))
      .expect("Could not read required application directories");
  }

  panic!("Could not read required application directories")
}

#[tauri::command]
fn write_todo_lists(app_handle: tauri::AppHandle, todo_lists: String) {
  if let Some(app_dir) = app_handle.path_resolver().app_dir() {
    fs::write(
      app_dir.join(LOCAL_STORAGE_DIR).join(TODO_LISTS_FILE),
      todo_lists,
    )
    .expect("Could not write to local storage files");
  }
}

#[tauri::command]
fn get_uuid() -> String {
  Uuid::new_v4().to_string()
}
