import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  return res.status(200).json([])
}