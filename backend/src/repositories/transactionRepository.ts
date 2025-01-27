import { ITransactionDocument, Transaction } from "@/models/Transaction";
import {
  IFindAllProps,
  ITransactionRepository,
  ITransactionToCreate,
} from "./interfaces/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  async findAll(data: IFindAllProps): Promise<{data: ITransactionDocument[], total: number}> {
    const transactions = await Transaction.find(
      { date: { $gte: data.startDate, $lte: data.endDate } },
      {},
      { skip: data.skip, limit: data.limit }
    );
    const total = await Transaction.countDocuments({ date: { $gte: data.startDate, $lte: data.endDate } });
    
    return { data: transactions, total};
  }
  async findManyByIds(id: string[]): Promise<ITransactionDocument[]> {
    const transactions = await Transaction.find({ transactionId: { $in: id } });
    return transactions;
  }
  async createMany(data: ITransactionToCreate[]): Promise<void> {
    await Transaction.insertMany(data);
  }
}
