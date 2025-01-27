import { Customer } from "@/models/Customer";
import { ICustomerRepository, ICustomerToCreate } from "./interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {

    async findManyByDocuments(documents: string[]) {
        return Customer.find({ document: { $in: documents } });
    }
    async createMany(data: ICustomerToCreate[]) {
      await Customer.insertMany(data);
    }
}