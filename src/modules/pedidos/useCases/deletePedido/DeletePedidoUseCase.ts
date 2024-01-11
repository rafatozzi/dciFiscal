import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { PedidosPgtosRepositories } from "../../infra/typeorm/repositories/PedidosPgtosRepositories";
import { PedidosProdutosRepositories } from "../../infra/typeorm/repositories/PedidosProdutosRepositories";
import { PedidosRepositories } from "../../infra/typeorm/repositories/PedidosRepositories";

@injectable()
export class DeletePedidoUseCase {

  constructor(
    // @inject("PedidosRepositories")
    // private pedidosRepositories: IPedidosRepositories,
    // @inject("PedidosProdutosRepositories")
    // private pedidosProdutosRepositories: IPedidosProdutosRepositories,
    // @inject("PedidosPgtosRepositories")
    // private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const pedidosRepositories = new PedidosRepositories(cod_cliente);
    const pedidosPgtosRepositories = new PedidosPgtosRepositories(cod_cliente);
    const pedidosProdutosRepositories = new PedidosProdutosRepositories(cod_cliente);

    const pedido = await pedidosRepositories.findById(id);

    if (!pedido)
      throw new AppError("Pedido não encontrado");

    const pgtos = await pedidosPgtosRepositories.findByPedido(pedido.id);
    const produtos = await pedidosProdutosRepositories.findByPedido(pedido.id);

    pgtos.map(async (item) => {
      await pedidosPgtosRepositories.deletePedidosPgtos(item.id);
    });

    produtos.map(async (item) => {
      await pedidosProdutosRepositories.deletePedidosProdutos(item.id);
    });

    await pedidosRepositories.deletePedido(id);
  }

}