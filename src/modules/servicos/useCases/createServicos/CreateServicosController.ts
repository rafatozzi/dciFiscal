import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateServicoDTO } from "../../dtos/ICreateServicoDTO";
import { CreateServicosUseCase } from "./CreateServicosUseCase";

export class CreateServicosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      recorrente,
      recorrente_dias,
      valor,
      favorito,
      id
    } = request.body as ICreateServicoDTO;

    const useCase = container.resolve(CreateServicosUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      nome,
      recorrente,
      recorrente_dias,
      valor,
      favorito,
      id
    })

    return response.status(200).json(result);
  }
}