#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

use db::{get_client, init_db};
use menu::get_menu;
use state::AppState;

mod commands;
mod db;
mod menu;
mod state;

const BUNDLE_IDENTIFIER: &str = "com.mbenja.tauri-todo-app";

#[tokio::main]
async fn main() {
  init_data_dir();

  let prisma_client = get_client().await;
  init_db(&prisma_client).await;

  tauri::Builder::default()
    .menu(get_menu())
    .manage(AppState { prisma_client })
    .invoke_handler(tauri::generate_handler![
      commands::get_todo_lists,
      commands::create_todo_list,
      commands::delete_todo_list,
      commands::rename_todo_list,
      commands::create_todo_item,
      commands::update_todo_item_complete,
      commands::delete_todo_item
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn init_data_dir() {
  let data_dir = tauri::api::path::data_dir()
    .unwrap_or(std::path::PathBuf::from("./"))
    .join(BUNDLE_IDENTIFIER);
  if !data_dir.exists() {
    fs::create_dir(data_dir).expect("Error creating application data directory");
  }
}
