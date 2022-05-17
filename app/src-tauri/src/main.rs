#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use menu::get_menu;
use state::AppState;

mod commands;
mod menu;
mod prisma;
mod state;

#[tokio::main]
async fn main() {
  let client = prisma::new_client()
    .await
    .expect("Error starting Prisma client");

  tauri::Builder::default()
    .menu(get_menu())
    .manage(AppState {
      prisma_client: client,
    })
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
