import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPedidosPgtosRepositories } from "../../repositories/IPedidosPgtosRepositories";
import { IPedidosProdutosRepositories } from "../../repositories/IPedidosProdutosRepositories";
import { IPedidosRepositories } from "../../repositories/IPedidosRepositories";

@injectable()
export class DeletePedidoUseCase {

  constructor(
    @inject("PedidosRepositories")
    private pedidosRepositories: IPedidosRepositories,
    @inject("PedidosProdutosRepositories")
    private pedidosProdutosRepositories: IPedidosProdutosRepositories,
    @inject("PedidosPgtosRepositories")
    private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const pedido = await this.pedidosRepositories.findById(id);

    if (!pedido)
      throw new AppError("Pedido não encontrado");

    const pgtos = await this.pedidosPgtosRepositories.findByPedido(pedido.id);
    const produtos = await this.pedidosProdutosRepositories.findByPedido(pedido.id);

    pgtos.map(async (item) => {
      await this.pedidosPgtosRepositories.deletePedidosPgtos(item.id);
    });

    produtos.map(async (item) => {
      await this.pedidosProdutosRepositories.deletePedidosProdutos(item.id);
    });

    await this.pedidosRepositories.deletePedido(id);
  }

}