import { inject, injectable } from "tsyringe";
import { IListProdutosDTO } from "../../dtos/IListProdutosDTO";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";

@injectable()
export class FindAllProdutosUseCase {

  constructor(
    @inject("ProdutosRepositories")
    private produtosRepositories: ProdutosRepositories
  ) { }

  async execute(pesquisa?: string, limit?: number, cursor?: number): Promise<IListProdutosDTO> {
    const result = await this.produtosRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}