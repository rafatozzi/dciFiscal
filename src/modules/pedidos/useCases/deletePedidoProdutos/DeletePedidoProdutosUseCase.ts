import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { PedidosProdutosRepositories } from "../../infra/typeorm/repositories/PedidosProdutosRepositories";

@injectable()
export class DeletePedidoProdutosUseCase {
  constructor(
    // @inject("PedidosProdutosRepositories")
    // private pedidosProdutosRepositories: IPedidosProdutosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const pedidosProdutosRepositories = new PedidosProdutosRepositories(cod_cliente);
    const pedProduto = await pedidosProdutosRepositories.findById(id);

    if (!pedProduto)
      throw new AppError("Item do pedido não encontrado");

    await pedidosProdutosRepositories.deletePedidosProdutos(id);
  }
}