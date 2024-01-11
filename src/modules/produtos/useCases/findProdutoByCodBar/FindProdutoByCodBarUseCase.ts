import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Produtos } from "../../infra/typeorm/entities/Produtos";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";


@injectable()
export class FindProdutoByCodBarUseCase {

  constructor(
    // @inject("ProdutosRepositories")
    // private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(cod_cliente: string, cod_bar: string): Promise<Produtos> {
    const produtosRepositories = new ProdutosRepositories(cod_cliente);
    const produto = await produtosRepositories.findByCodBarras(cod_bar);

    if (!produto)
      throw new AppError("Produto não encontrado");

    return produto;
  }

}