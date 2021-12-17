import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCertificadoUseCase } from "./UploadCertificadoUseCase";

export class UploadCertificadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { empresa_id } = request.body;
    const file = request.file.filename;

    const useCase = container.resolve(UploadCertificadoUseCase);

    await useCase.execute(empresa_id, file);

    return response.status(200).send();
  }
}