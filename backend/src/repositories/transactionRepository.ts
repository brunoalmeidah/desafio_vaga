import { ITransactionDocument, Transaction } from "@/models/Transaction";
import {
  IFindAllProps,
  ITransactionRepository,
  ITransactionToCreate,
} from "./interfaces/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  async findAll(
    data: IFindAllProps
  ): Promise<{ rows: ITransactionDocument[]; count: number }> {
    const pipelinesAggregate = [
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $match: {
          ...(data.startDate && data.endDate
            ? { date: { $gte: data.startDate, $lte: data.endDate } }
            : {}),
          customer: { $ne: null },
          ...(data.customer
            ? { "customer.name": { $regex: data.customer } }
            : {}),
        },
      },
    ];
    const transactions = await Transaction.aggregate([
      ...pipelinesAggregate,
      { $sort: { date: -1 } },
      { $skip: data.skip },
      { $limit: data.limit },
    ]);

    const [firstRow] = await Transaction.aggregate([
      ...pipelinesAggregate,
      { $count: "count" },
    ]);

    return { rows: transactions, count: firstRow?.count ?? 0 };
  }
  async findManyByIds(id: string[]): Promise<ITransactionDocument[]> {
    const transactions = await Transaction.find({ transactionId: { $in: id } });
    return transactions;
  }
  async createMany(data: ITransactionToCreate[]): Promise<void> {
    await Transaction.insertMany(data);
  }
}
