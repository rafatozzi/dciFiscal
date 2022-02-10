import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateFormaPgtoDTO } from "../../dtos/ICreateFormaPgtoDTO";
import { CreateFormaPgtoUseCase } from "./CreateFormaPgtoUseCase";

export class CreateFormaPgtoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      nome,
      intervalo_parcelas,
      max_parcelas,
      primeira_parcela_dias,
      tipo_recebimento
    } = request.body as ICreateFormaPgtoDTO;

    const useCase = container.resolve(CreateFormaPgtoUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      id,
      nome,
      intervalo_parcelas,
      max_parcelas,
      primeira_parcela_dias,
      tipo_recebimento
    });

    return response.status(200).json(result);
  }
}