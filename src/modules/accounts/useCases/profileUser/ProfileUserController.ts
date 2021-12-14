import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(ProfileUserUseCase);

    const profile = await useCase.execute(id);

    return response.status(200).json(profile);
  }
}