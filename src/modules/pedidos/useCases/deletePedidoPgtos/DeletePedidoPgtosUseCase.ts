import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { PedidosPgtosRepositories } from "../../infra/typeorm/repositories/PedidosPgtosRepositories";

@injectable()
export class DeletePedidoPgtosUseCase {
  constructor(
    // @inject("PedidosPgtosRepositories")
    // private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const pedidosPgtosRepositories = new PedidosPgtosRepositories(cod_cliente);
    const pedPgto = await pedidosPgtosRepositories.findById(id);

    if (!pedPgto)
      throw new AppError("Variante do produto não encontrado");

    await pedidosPgtosRepositories.deletePedidosPgtos(id);
  }

}