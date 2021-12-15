import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUfUseCase } from "./ListUfUseCase";

export class ListUfController {
  async handle(resquest: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ListUfUseCase);

    const result = await useCase.execute();

    return response.status(200).json(result);
  }
}