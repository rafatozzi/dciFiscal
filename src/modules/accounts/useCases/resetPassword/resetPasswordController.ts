import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { senha } = request.body;

    const useCase = container.resolve(ResetPasswordUseCase);

    await useCase.execute({
      senha,
      token: `${token}`
    });

    return response.status(200).json();
  }
}