use crate::{
  db::prisma::{todo_item, todo_list},
  state::AppState,
};

#[tauri::command(async)]
pub async fn get_todo_lists(
  state: tauri::State<'_, AppState>,
) -> Result<Vec<todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_many(vec![])
    .with(todo_list::todos::fetch(vec![]))
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
pub async fn create_todo_list(
  state: tauri::State<'_, AppState>,
  name: String,
) -> Result<todo_list::Data, String> {
  match state
    .prisma_client
    .todo_list()
    .create(todo_list::name::set(name), vec![])
    .with(todo_list::todos::fetch(vec![]))
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
pub async fn delete_todo_list(
  state: tauri::State<'_, AppState>,
  list_id: i32,
) -> Result<Option<todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_unique(todo_list::id::equals(list_id))
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
pub async fn rename_todo_list(
  state: tauri::State<'_, AppState>,
  list_id: i32,
  new_name: String,
) -> Result<Option<todo_list::Data>, String> {
  match state
    .prisma_client
    .todo_list()
    .find_unique(todo_list::id::equals(list_id))
    .update(vec![todo_list::name::set(new_name)])
    .with(todo_list::todos::fetch(vec![]))
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
pub async fn create_todo_item(
  state: tauri::State<'_, AppState>,
  list_id: i32,
  todo_text: String,
) -> Result<todo_item::Data, String> {
  match state
    .prisma_client
    .todo_item()
    .create(
      todo_item::todo_list::link(todo_list::id::equals(list_id)),
      todo_item::text::set(todo_text),
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
pub async fn update_todo_item_complete(
  state: tauri::State<'_, AppState>,
  todo_id: i32,
  complete: bool,
) -> Result<Option<todo_item::Data>, String> {
  match state
    .prisma_client
    .todo_item()
    .find_unique(todo_item::id::equals(todo_id))
    .update(vec![todo_item::complete::set(complete)])
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
pub async fn delete_todo_item(
  state: tauri::State<'_, AppState>,
  todo_id: i32,
) -> Result<Option<todo_item::Data>, String> {
  match state
    .prisma_client
    .todo_item()
    .find_unique(todo_item::id::equals(todo_id))
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
