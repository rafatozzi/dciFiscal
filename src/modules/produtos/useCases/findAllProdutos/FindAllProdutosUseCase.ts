import { inject, injectable } from "tsyringe";
import { IListProdutosDTO } from "../../dtos/IListProdutosDTO";
import { IProdutosRepositories } from "../../repositories/IProdutosRepositories";

@injectable()
export class FindAllProdutosUseCase {

  constructor(
    @inject("ProdutosRepositories")
    private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(pesquisa?: string, limit?: number, cursor?: number): Promise<IListProdutosDTO> {
    const result = await this.produtosRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}