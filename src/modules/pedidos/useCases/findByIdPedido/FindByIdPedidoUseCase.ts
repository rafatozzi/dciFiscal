import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Pedidos } from "../../infra/typeorm/entities/Pedidos";
import { IPedidosRepositories } from "../../repositories/IPedidosRepositories";

@injectable()
export class FindByIdPedidoUseCase {

  constructor(
    @inject("PedidosRepositories")
    private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(id: string): Promise<Pedidos> {
    const pedido = await this.pedidosRepositories.findById(id);

    if (!pedido)
      throw new AppError("Pedido não encontrado");

    return pedido;
  }

}