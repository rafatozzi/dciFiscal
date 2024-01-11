import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEmpresaUseCase } from "./deleteEmpresaUseCase";

export class DeleteEmpresaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteEmpresaUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).json();
  }
}