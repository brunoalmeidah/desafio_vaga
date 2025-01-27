import { makeGetAllTransactionsService } from "@/services/factories/makeGetAllTransactionsService";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const { startDate, endDate, page } = req.query;
  const getAllTransactionsService = makeGetAllTransactionsService();
  const result = await getAllTransactionsService.execute({
    startDate: startDate?.toString() ?? "",
    endDate: endDate?.toString() ?? "",
    page: page?.toString() ?? "",
  });
  res.status(200).json({data: result});
}
