import { ICustomerDocument } from "@/models/Customer";

export interface ICustomerToCreate {
  name: string;
  document: string;
  id?: string;
}

export interface ICustomerRepository {
  findManyByDocuments(documents: string[]): Promise<ICustomerDocument[]>;
  createMany(data: ICustomerToCreate[]): Promise<void>;
}