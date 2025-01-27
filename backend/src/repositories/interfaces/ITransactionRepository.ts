import { ITransactionDocument } from '@/models/Transaction';
export interface ITransactionToCreate {
  transactionId: string
  date: Date
  value: number
  customerId: string
}
export interface IFindAllProps {
  startDate: string
  endDate: string
  skip: number
  limit: number
}
export interface ITransactionRepository {
  findManyByIds(id: string[]): Promise<ITransactionDocument[]>;
  createMany(data: ITransactionToCreate[]): Promise<void>;
  findAll(data: IFindAllProps): Promise<{data: ITransactionDocument[], total: number}>;
}