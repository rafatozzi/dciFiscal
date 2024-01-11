import { injectable } from "tsyringe";
import { IListProdutosDTO } from "../../dtos/IListProdutosDTO";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";

@injectable()
export class FindFavoritosUseCase {
  constructor() { }

  async execute(cod_cliente: string): Promise<IListProdutosDTO> {
    const produtosRepositories = new ProdutosRepositories(cod_cliente);
    const result = await produtosRepositories.findFavoritos();

    return result;
  }
}