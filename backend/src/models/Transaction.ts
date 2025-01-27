import { model, Schema, Types } from "mongoose";
interface ITransaction {
  transactionId: string;
  customer: Types.ObjectId;
  date: Date;
  value: number;
}

export type ITransactionDocument = ITransaction & Document;

const transactionSchema = new Schema<ITransactionDocument>(
  {
    transactionId: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
  }
);

export const Transaction = model<ITransactionDocument>(
  "Transaction",
  transactionSchema
);
