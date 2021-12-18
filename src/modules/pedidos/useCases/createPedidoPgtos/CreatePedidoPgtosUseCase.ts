import { inject, injectable } from "tsyringe";
import { ICreatePedidosPgtosDTO } from "../../dtos/ICreatePedidosPgtosDTO";
import { IPedidosPgtosRepositories } from "../../repositories/IPedidosPgtosRepositories";

@injectable()
export class CreatePedidoPgtosUseCase {
  constructor(
    @inject("PedidosPgtosRepositories")
    private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(data: ICreatePedidosPgtosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const newData = data.map((item) => {
      if (
        item.id_pedidos && item.id_pedidos.length > 0
        && item.forma_pgto && item.forma_pgto > 0
        && item.valor && item.valor > 0) {
        return item;
      }
    })

    await this.pedidosPgtosRepositories.create(newData);
  }

}