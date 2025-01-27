import { TransactionRepository } from "@/repositories/transactionRepository";
import { GetAllTransactionsService } from "../getAllTransactionsService";

export function makeGetAllTransactionsService() {
  const transactionRepository = new TransactionRepository();

  const service = new GetAllTransactionsService(transactionRepository);
  return service;
}
