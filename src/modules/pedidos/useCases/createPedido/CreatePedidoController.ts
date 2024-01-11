import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreatePedidosDTO } from "../../dtos/ICreatePedidosDTO";
import { CreatePedidoUseCase } from "./CreatePedidoUseCase";

export class CreatePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id_cliente,
      id,
      id_empresa,
      total,
      desconto,
      endereco,
      numero,
      bairro,
      id_cidades,
      cep,
      complemento,
      valor_pago,
      local_venda
    } = request.body as ICreatePedidosDTO;

    const useCase = container.resolve(CreatePedidoUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      id_cliente,
      id,
      id_empresa,
      total,
      desconto,
      endereco,
      numero,
      bairro,
      id_cidades,
      cep,
      complemento,
      valor_pago,
      local_venda
    });

    return response.status(200).json(result);
  }
}