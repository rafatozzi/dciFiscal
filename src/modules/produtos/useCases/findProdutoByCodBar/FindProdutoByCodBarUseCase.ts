import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Produtos } from "../../infra/typeorm/entities/Produtos";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";


@injectable()
export class FindProdutoByCodBarUseCase {

  constructor(
    @inject("ProdutosRepositories")
    private produtosRepositories: ProdutosRepositories
  ) { }

  async execute(cod_bar: string): Promise<Produtos> {
    const produto = await this.produtosRepositories.findByCodBarras(cod_bar);

    if (!produto)
      throw new AppError("Produto não encontrado");

    return produto;
  }

}