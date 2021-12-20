import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateClientesDTO } from "../../dtos/ICreateClientesDTO";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

export class CreateClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      bairro,
      cpf_cnpj,
      celular,
      cep,
      complemento,
      email,
      endereco,
      fantasia,
      id_cidades,
      numero,
      razao_social,
      rg_ie,
      telefone,
      id
    } = request.body as ICreateClientesDTO;

    const useCase = container.resolve(CreateClienteUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      bairro,
      cpf_cnpj,
      celular,
      cep,
      complemento,
      email,
      endereco,
      fantasia,
      id_cidades,
      numero,
      razao_social,
      rg_ie,
      telefone,
      id
    });

    return response.status(200).json(result);
  }
}