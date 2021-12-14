import { container } from "tsyringe";
import { Request, Response } from "express";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";


export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, senha, user } = request.body as ICreateUserDTO;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ nome, senha, user })

    return response.status(200).send();

  }
}