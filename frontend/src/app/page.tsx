import { DashboardTable } from "./dashboard-table";
import { getTransactions } from "@/http/get-transactions";

export default async function Home() {
  const data = await getTransactions({ page: 1 });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
      <DashboardTable initialData={data} />
    </div>
  );
}
