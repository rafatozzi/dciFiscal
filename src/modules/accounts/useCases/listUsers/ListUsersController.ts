import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { limit, cursor } = request.body;

    const useCase = container.resolve(ListUsersUseCase);

    const result = await useCase.execute(limit, cursor);

    return response.status(200).json(result);
  }
}