import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdUseCase } from "./FindByIdUseCase";

export class FindByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindByIdUseCase);

    const result = await useCase.execute(id);

    return response.status(200).json(result);
  }
}