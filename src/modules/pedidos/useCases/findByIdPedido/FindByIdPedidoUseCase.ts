import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Pedidos } from "../../infra/typeorm/entities/Pedidos";
import { PedidosRepositories } from "../../infra/typeorm/repositories/PedidosRepositories";

@injectable()
export class FindByIdPedidoUseCase {

  constructor(
    // @inject("PedidosRepositories")
    // private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<Pedidos> {
    const pedidosRepositories = new PedidosRepositories(cod_cliente);
    const pedido = await pedidosRepositories.findById(id);

    if (!pedido)
      throw new AppError("Pedido não encontrado");

    return pedido;
  }

}