import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCertificadoUseCase } from "./UploadCertificadoUseCase";

export class UploadCertificadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { empresa_id, venc_cert } = request.body;
    const file = request.file.filename;

    const useCase = container.resolve(UploadCertificadoUseCase);

    await useCase.execute(request.cod_cliente, empresa_id, file, venc_cert);

    return response.status(200).send();
  }
}