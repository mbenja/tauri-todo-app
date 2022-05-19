use crate::db::prisma::PrismaClient;

pub struct AppState {
  pub prisma_client: PrismaClient,
}
