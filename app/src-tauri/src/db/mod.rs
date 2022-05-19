pub(crate) mod prisma;

use crate::BUNDLE_IDENTIFIER;

use self::prisma::PrismaClient;

const DB_FILE_NAME: &str = "database.db";
static SQL_MIGRATION_STATEMENTS: &str = include_str!("migration.sql");

pub async fn get_client() -> PrismaClient {
  let data_dir = tauri::api::path::data_dir().unwrap_or(std::path::PathBuf::from("./"));
  let db_path = data_dir.join(BUNDLE_IDENTIFIER).join(DB_FILE_NAME);

  prisma::new_client_with_url(&format!(
    "file:{}",
    db_path
      .to_str()
      .expect("Error obtaining database directory")
  ))
  .await
  .expect("Error starting Prisma client")
}

pub async fn init_db(prisma_client: &PrismaClient) {
  for statement in SQL_MIGRATION_STATEMENTS.split(";") {
    let trimmed_statement = statement.trim_end();

    if trimmed_statement.len() > 0 {
      prisma_client
        ._execute_raw(trimmed_statement)
        .await
        .expect("Error executing migration SQL");
    }
  }
}
