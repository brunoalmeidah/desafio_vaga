import { ITransactionRepository } from "@/repositories/interfaces/ITransactionRepository";

interface IProps {
  startDate: string;
  endDate: string;
  customer: string;
  page: string;
}
export class GetAllTransactionsService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({ startDate, endDate, page, customer }: IProps) {
    const limit = 10;
    const transactions = await this.transactionRepository.findAll({
      startDate,
      endDate,
      customer,
      skip: (parseInt(page) - 1) * limit,
      limit,
    });
    return transactions;
  }
}
