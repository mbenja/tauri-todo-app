#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use prisma::PrismaClient;

mod prisma;

struct AppState {
  prisma_client: PrismaClient,
}

#[tokio::main]
async fn main() {
  let client = prisma::new_client()
    .await
    .expect("Error starting Prisma client");

  tauri::Builder::default()
    .manage(AppState {
      prisma_client: client,
    })
    .invoke_handler(tauri::generate_handler![
      get_todo_lists,
      create_todo_list,
      delete_todo_list,
      rename_todo_list,
      create_todo_item,
      update_todo_item_complete,
      delete_todo_item
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command(async)]
async fn get_todo_lists(
  state: tauri::State<'_, AppState>,
) -> Result<Vec<prisma::todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_many(vec![])
    .with(prisma::todo_list::todos::fetch(vec![]))
    .exec()
    .await
  {
    Ok(todo_lists) => Ok(todo_lists),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn create_todo_list(
  state: tauri::State<'_, AppState>,
  new_list_name: String,
) -> Result<prisma::todo_list::Data, String> {
  match state
    .prisma_client
    .todo_list()
    .create(prisma::todo_list::name::set(new_list_name), vec![])
    .with(prisma::todo_list::todos::fetch(vec![]))
    .exec()
    .await
  {
    Ok(new_list) => Ok(new_list),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn delete_todo_list(
  state: tauri::State<'_, AppState>,
  list_id: i32,
) -> Result<Option<prisma::todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_unique(prisma::todo_list::id::equals(list_id))
    .delete()
    .exec()
    .await
  {
    Ok(deleted_list) => Ok(deleted_list),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn rename_todo_list(
  state: tauri::State<'_, AppState>,
  list_id: i32,
  new_name: String,
) -> Result<Option<prisma::todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_unique(prisma::todo_list::id::equals(list_id))
    .update(vec![prisma::todo_list::name::set(new_name)])
    .exec()
    .await
  {
    Ok(updated_list) => Ok(updated_list),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn create_todo_item(
  state: tauri::State<'_, AppState>,
  list_id: i32,
  todo_text: String,
) -> Result<prisma::todo_item::Data, String> {
  match state
    .prisma_client
    .todo_item()
    .create(
      prisma::todo_item::todo_list::link(prisma::todo_list::id::equals(list_id)),
      prisma::todo_item::text::set(todo_text),
      vec![],
    )
    .exec()
    .await
  {
    Ok(new_todo_item) => Ok(new_todo_item),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn update_todo_item_complete(
  state: tauri::State<'_, AppState>,
  todo_id: i32,
  complete: bool,
) -> Result<Option<prisma::todo_item::Data>, String> {
  match state
    .prisma_client
    .todo_item()
    .find_unique(prisma::todo_item::id::equals(todo_id))
    .update(vec![prisma::todo_item::complete::set(complete)])
    .exec()
    .await
  {
    Ok(updated_todo_item) => Ok(updated_todo_item),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}

#[tauri::command(async)]
async fn delete_todo_item(
  state: tauri::State<'_, AppState>,
  todo_id: i32,
) -> Result<Option<prisma::todo_item::Data>, String> {
  match state
    .prisma_client
    .todo_item()
    .find_unique(prisma::todo_item::id::equals(todo_id))
    .delete()
    .exec()
    .await
  {
    Ok(deleted_todo) => Ok(deleted_todo),
    Err(e) => {
      println!("Error: {:?}", e);
      Err(e.to_string())
    }
  }
}
