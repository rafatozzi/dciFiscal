import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";

@injectable()
export class DeleteProdutoUseCase {

  constructor(
    @inject("ProdutosRepositories")
    private produtosRepositories: ProdutosRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const produto = await this.produtosRepositories.findById(id);

    if (!produto)
      throw new AppError("Produto não encontrado");

    await this.produtosRepositories.deleteProduto(id);
  }

}