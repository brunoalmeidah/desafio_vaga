"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransactions, ITransaction } from "@/http/get-transactions";
import { DashboardTableFilters, IFilterData } from "./dashboart-table-filters";
import { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { Pagination } from "@/components/pagination";
import { formatCurrency } from "@/helpers/formatCurrency";
import { importFile } from "@/http/import-file";
import { toast } from "sonner";
import { LoadingModal } from "@/components/loading-modal";

interface IProps {
  initialData?: { rows: ITransaction[]; count: number };
}
export function DashboardTable({ initialData }: IProps) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<IFilterData | null>();
  const [data, setData] = useState(initialData);
  const [isImporting, setIsImporting] = useState(false);

  const handleFetch = async ({
    _page,
    _filter,
  }: {
    _page?: number;
    _filter?: IFilterData | null;
  }) => {

    const startDate =
    _filter?.date?.from &&
      dayjs(_filter.date.from).format("YYYY-MM-DD");
    const endDate =
    _filter?.date?.to &&
      dayjs(_filter.date.to).format("YYYY-MM-DD");
    const data = await getTransactions({
      page: _page ?? 1,
      startDate,
      endDate,
      customer: _filter?.customer,
    });
    setData(data);
  };

  async function handlePageChange(_page: number) {
    setPage(_page);
    handleFetch({ _page, _filter: filter });
  }

  async function handleFilter(data: IFilterData | null) {
    setFilter(data);
    handleFetch({ _filter: data, _page: page });
  }



  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      setIsImporting(true);
      const file = e?.target?.files?.[0];
      const formData = new FormData();
      formData.append("file", file ?? "");
      await importFile(formData);
      toast.error("Arquivo importado com sucesso!");
      await handleFetch({_page: 1});
      const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }
      setIsImporting(false);
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem, tente novamente!");
      console.log(error);
    }
  }

  return (
    <>
      <div className="space-y-2.5">
        <DashboardTableFilters
          onFilter={handleFilter}
          handleFileChange={handleFileChange}
        />
        <div className="rouded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[250px]">Documento</TableHead>
                <TableHead className="w-[140px]">Data</TableHead>
                <TableHead className="w-[140px]">Valor</TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.rows?.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center font-medium" colSpan={4}>
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              ) : null}

              {data?.rows?.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell className="font-medium">
                    {transaction.customer.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.customer.document}
                  </TableCell>
                  <TableCell className="font-medium">
                    {dayjs(transaction.date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(transaction.value / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          page={page}
          totalCount={data?.count || 0}
          perPage={10}
          onPageChange={handlePageChange}
        />
      </div>
      {isImporting ? <LoadingModal /> : null}
    </>
  );
}
