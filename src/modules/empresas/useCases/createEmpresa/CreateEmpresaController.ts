import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmpresaUseCase } from "./CreateEmpresaUseCase";

export class CreateEmpresaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      id_cidades,
      razao,
      fantasia,
      cnpj,
      ie,
      crt,
      cep,
      fone,
      nr,
      bairro,
      complemento,
      endereco,
      nr_nfe,
      serie_nfe,
      ambiente,
      senha_cert
    } = request.body;

    const useCase = container.resolve(CreateEmpresaUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      id,
      id_cidades,
      razao,
      fantasia,
      cnpj,
      ie,
      crt,
      cep,
      fone,
      nr,
      bairro,
      complemento,
      endereco,
      nr_nfe,
      serie_nfe,
      ambiente,
      senha_cert
    });

    return response.status(200).json(result);
  }
}