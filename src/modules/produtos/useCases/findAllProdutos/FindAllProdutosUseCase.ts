import { injectable } from "tsyringe";
import { IListProdutosDTO } from "../../dtos/IListProdutosDTO";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";

@injectable()
export class FindAllProdutosUseCase {

  constructor(
    // @inject("ProdutosRepositories")
    // private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: string, limit?: number, cursor?: number): Promise<IListProdutosDTO> {
    const produtosRepositories = new ProdutosRepositories(cod_cliente);
    const result = await produtosRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}