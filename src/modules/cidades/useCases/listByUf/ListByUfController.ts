import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListByUfUseCases } from "./ListByUfUseCases";

export class ListByUfController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_uf } = request.body;
    const useCase = container.resolve(ListByUfUseCases);

    const result = await useCase.execute(id_uf);

    return response.status(200).json(result);
  }
}