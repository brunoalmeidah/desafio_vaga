import {resolve} from 'path'
import fs from 'fs'
import readline from "readline";
//import chunk from "lodash.chunk";
import { performance } from "perf_hooks";
import { ITransactionRepository } from '@/repositories/interfaces/ITransactionRepository';
import { ICustomerRepository, ICustomerToCreate } from '@/repositories/interfaces/ICustomerRepository';
import  dayjs from 'dayjs'

interface ICustomersHashTable {
  [index: string]: ICustomerToCreate;
}
interface ITransaction {
  id: string;
  date: string;
  value: string;
  customer: ICustomerToCreate;
}

export class ImportFileService {

  constructor(private transactionRepository: ITransactionRepository, private customerRepository: ICustomerRepository) {}
  
  async execute(file?: Express.Multer.File): Promise<{ timeExportation: number }>  {
    console.log(file)
    if(!file) return { timeExportation: 0 }
    const filePath = resolve(__dirname, "..", "..", file?.path ?? "");
    const start = performance.now();
    const { transactions, customers } = await new Promise<{
      transactions: ITransaction[];
      customers: ICustomersHashTable;
    }>((resolve) => {
      const stream = fs.createReadStream(filePath, { encoding: "utf8" });
      const rl = readline.createInterface({ input: stream });
      const transactions: ITransaction[] = [];
      const customers: ICustomersHashTable = {};
      const customersDocuments: string[] = [];
      rl.on("line", (line: string) => {
        const _line = line.split(";");
        const transactionId = _line[0].split(":")[1];
        const customerName = _line[1].split(":")[1];
        const customerDocument = _line[2].split(":")[1];
        const transactionDate = _line[3].split(":")[1];
        const transactionValue = _line[4].split(":")[1];
        transactions.push({
          id: transactionId,
          date: transactionDate,
          value: transactionValue,
          customer: {
            name: customerName,
            document: customerDocument,
          },
        });
  
        customers[customerDocument] = {
          name: customerName,
          document: customerDocument,
        };

        customersDocuments.push(customerDocument);
      });
  
      rl.on("close", () => {
        console.log("Leitura do arquivo concluída.");
        resolve({ transactions, customers });
      });
    });
    /*const customersDocumentsChunked = chunk(Object.keys(customers), 100);
  
    const customersFromDatabase = (
      await Promise.all(
        customersDocumentsChunked.map((item) =>
          this.customerRepository.findManyByDocuments(item)
        )
      )
    ).flatMap((item) => item);*/
    const customersFromDatabase = await this.customerRepository.findManyByDocuments(Object.keys(customers))

    customersFromDatabase.forEach((item) => {
      customers[item.document].id = item._id.toString();
    });
    const customersToCreate = Object.values(customers).filter((item) => !item.id);
    
    await this.customerRepository.createMany(customersToCreate)

   /* const customersToCreateChunked = chunk(
      customersToCreate.map((item) => item.document),
      100
    );
  
    const customersCreated = (
      await Promise.all(
        customersToCreateChunked.map((item) =>
          this.customerRepository.findManyByDocuments(item)
        )
      )
    ).flatMap((item) => item);*/

    const customersCreated = await this.customerRepository.findManyByDocuments(customersToCreate.map((item) => item.document))
    customersCreated.forEach((item) => {
      customers[item.document].id = item._id.toString();
    });
  
    /*const transactionsChunked = chunk(transactions, 100);
  
    const transactionsExists = (
      await Promise.all(
        transactionsChunked.map((item) =>
          this.transactionRepository.findManyByIds(item.map((item) => item.id))
        )
      )
    ).flatMap((item) => item);
  */

    const transactionsExists = await this.transactionRepository.findManyByIds(transactions.map((item) => item.id))
    const transactionsExistsTransformed: { [index: string]: boolean } = {};
    transactionsExists.forEach((item) => {
      transactionsExistsTransformed[item.transactionId] = true;
    });

    const transactionToCreate = transactions.filter(
      (item) => !transactionsExistsTransformed[item.id]
    );

    await this.transactionRepository.createMany(transactionToCreate.map((item) => ({
      transactionId: item.id,
      date: dayjs(item.date).toDate(),
      value: +item.value,
      customer: customers[item.customer.document].id ?? "",
    })));
  
    const end = performance.now();

    return { timeExportation: end - start };
  }
}
