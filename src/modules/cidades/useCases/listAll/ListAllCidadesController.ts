import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCidadesUseCases } from "./ListAllCidadesUseCases";

export class ListAllCidadesController {
  async handle(resquest: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ListAllCidadesUseCases);

    const result = await useCase.execute();

    return response.status(200).json(result);
  }
}