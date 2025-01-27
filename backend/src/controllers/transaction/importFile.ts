
import { Request, Response } from "express";
import { makeImportFileService } from '@/services/factories/makeImportFileService';


export async function importFile(req: Request, res: Response) {

 const importFileService = makeImportFileService()

 const { timeExportation } = await importFileService.execute(req.file)
  res
    .status(200)
    .json({ message: "Arquivo importado com sucesso", timeExportation });
}
