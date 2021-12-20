import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";

@injectable()
export class DeleteProdutoUseCase {

  constructor(
    // @inject("ProdutosRepositories")
    // private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const produtosRepositories = new ProdutosRepositories(cod_cliente);
    const produto = await produtosRepositories.findById(id);

    if (!produto)
      throw new AppError("Produto não encontrado");

    await produtosRepositories.deleteProduto(id);
  }

}