import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateNfeDTO } from "../../dtos/ICreateNfeDTO";
import { CreateNfeUseCase } from "./CreateNfeUseCase";

export class CreateNfeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id_cliente,
      id,
      id_empresa,
      total,
      desconto,
      nr_nfe,
      cancel_motivo,
      cancelado,
      chave,
      motivo,
      recibo,
      status
    } = request.body as ICreateNfeDTO;

    const useCase = container.resolve(CreateNfeUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      id_cliente,
      id,
      id_empresa,
      total,
      desconto,
      nr_nfe,
      cancel_motivo,
      cancelado,
      chave,
      motivo,
      recibo,
      status
    });

    return response.status(200).json(result);
  }
}