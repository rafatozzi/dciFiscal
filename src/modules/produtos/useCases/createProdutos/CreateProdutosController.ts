import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateProdutosDTO } from "../../dtos/ICreateProdutosDTO";
import { CreateProdutosUseCase } from "./CreateProdutosUseCase";

export class CreateProdutosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cfop, cod_barras, ncm, nome, preco, unid_med, id } = request.body as ICreateProdutosDTO;

    const useCase = container.resolve(CreateProdutosUseCase);

    const result = await useCase.execute({ cfop, cod_barras, ncm, nome, preco, unid_med, id });

    return response.status(200).json(result);
  }
}