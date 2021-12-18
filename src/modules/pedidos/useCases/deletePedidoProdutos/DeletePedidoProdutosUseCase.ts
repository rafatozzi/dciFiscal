import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPedidosProdutosRepositories } from "../../repositories/IPedidosProdutosRepositories";

@injectable()
export class DeletePedidoProdutosUseCase {
  constructor(
    @inject("PedidosProdutosRepositories")
    private pedidosProdutosRepositories: IPedidosProdutosRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const pedProduto = await this.pedidosProdutosRepositories.findById(id);

    if (!pedProduto)
      throw new AppError("Item do pedido não encontrado");

    await this.pedidosProdutosRepositories.deletePedidosProdutos(id);
  }
}