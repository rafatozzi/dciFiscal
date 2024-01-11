import { Request, Response } from "express";
import { container } from "tsyringe";
import { IMulterFiles } from "../../dtos/IMulterFiles";
import { ImportarXmlUseCase } from "./ImportarXmlUseCase";

export class ImportarXmlController {
  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IMulterFiles[];

    const useCase = container.resolve(ImportarXmlUseCase);

    await useCase.execute(request.cod_cliente, files);

    return response.status(200).send();
  }
}