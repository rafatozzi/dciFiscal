import { injectable } from "tsyringe";
import { ICreatePedidosPgtosDTO } from "../../dtos/ICreatePedidosPgtosDTO";
import { PedidosPgtosRepositories } from "../../infra/typeorm/repositories/PedidosPgtosRepositories";

@injectable()
export class CreatePedidoPgtosUseCase {
  constructor(
    // @inject("PedidosPgtosRepositories")
    // private pedidosPgtosRepositories: IPedidosPgtosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreatePedidosPgtosDTO[]): Promise<void> {
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

    const pedidosPgtosRepositories = new PedidosPgtosRepositories(cod_cliente);
    await pedidosPgtosRepositories.create(newData);
  }

}