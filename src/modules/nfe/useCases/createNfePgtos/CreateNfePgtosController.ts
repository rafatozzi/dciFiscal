import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNfePgtosUseCase } from "./CreateNfePgtosUseCase";

export class CreateNfePgtosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateNfePgtosUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}