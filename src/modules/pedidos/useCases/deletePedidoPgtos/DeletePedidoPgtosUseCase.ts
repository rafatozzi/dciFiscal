import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPedidosPgtosRepositories } from "../../repositories/IPedidosPgtosRepositories";

@injectable()
export class DeletePedidoPgtosUseCase {
  constructor(
    @inject("PedidosPgtosRepositories")
    private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const pedPgto = await this.pedidosPgtosRepositories.findById(id);

    if (!pedPgto)
      throw new AppError("Variante do produto não encontrado");

    await this.pedidosPgtosRepositories.deletePedidosPgtos(id);
  }

}