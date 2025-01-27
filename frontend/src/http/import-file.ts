import { api } from "./api-client";

interface ImportFileResponse {
  message: string;
  timeExportation: number
}

export async function importFile(formData: FormData) {
  try {
    const result = await api
      .post("transactions/import", { body: formData })
      .json<ImportFileResponse>();
    return result;
  } catch (error) {
    console.log(error);
  }
}
