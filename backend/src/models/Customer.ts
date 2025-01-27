import { model, Schema, Types } from "mongoose";
interface ICustomer {
  _id: Types.ObjectId;
  name: string;
  document: string;
}

export type ICustomerDocument = ICustomer & Document;

const customerSchema = new Schema<ICustomerDocument>({
  name: { type: String, required: true },
  document: { type: String, required: true, unique: true },
});

export const Customer = model<ICustomerDocument>("Customer", customerSchema);
