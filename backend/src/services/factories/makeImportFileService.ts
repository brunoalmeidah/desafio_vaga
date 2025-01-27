import { CustomerRepository } from "@/repositories/customerRepository";
import { TransactionRepository } from "@/repositories/transactionRepository";
import { ImportFileService } from "../importFileService";

export function makeImportFileService() {
  const transactionRepository = new TransactionRepository()
  const customerRepository = new CustomerRepository()

  const importFileService = new ImportFileService(transactionRepository, customerRepository)
  return importFileService
}