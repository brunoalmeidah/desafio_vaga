import { api } from "./api-client";

export interface ITransaction {
  _id: string;
  transactionId: string;
  date: string;
  value: number;
  customer: {
    name: string;
    document: string;
  };
}
interface GetTransactionResponse {
  rows: ITransaction[];
  count: number;
}

interface GetTransactionsProps {
  startDate?: string;
  endDate?: string;
  customer?: string;
  page: number;
}

export async function getTransactions({
  startDate,
  endDate,
  customer,
  page,
}: GetTransactionsProps) {

  try {
    const result = await api
      .get(`transactions`, {
        searchParams: new URLSearchParams({
          ...(startDate && endDate ? { startDate, endDate } : {}),
          customer: customer || "",
          page: String(page),
        }),
      })
      .json<GetTransactionResponse>();
    return result;
  } catch (error) {
    console.log(error);
  }
}
