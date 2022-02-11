import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateOrdemServicoDTO } from "../../dtos/ICreateOrdemServicoDTO";
import { CreateOrdemServicoUseCase } from "./CreateOrdemServicoUseCase";

export class CreateOrdemServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, descricao, id_cliente, id_user } = request.body as ICreateOrdemServicoDTO;

    const useCase = container.resolve(CreateOrdemServicoUseCase);

    const result = await useCase.execute(request.cod_cliente, { id, descricao, id_cliente, id_user });

    return response.status(200).json(result);
  }
}