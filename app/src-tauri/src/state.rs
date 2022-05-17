use crate::prisma::PrismaClient;

pub struct AppState {
  pub prisma_client: PrismaClient,
}
