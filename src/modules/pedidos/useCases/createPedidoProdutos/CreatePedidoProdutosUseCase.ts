import { injectable } from "tsyringe";
import { ICreatePedidosProdutosDTO } from "../../dtos/ICreatePedidosProdutosDTO";
import { PedidosProdutosRepositories } from "../../infra/typeorm/repositories/PedidosProdutosRepositories";

@injectable()
export class CreatePedidoProdutosUseCase {

  constructor(
    // @inject("PedidosProdutosRepositories")
    // private pedidosProdutosRepositories: IPedidosProdutosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreatePedidosProdutosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const newData = data.map((item) => {
      if (item.id_pedidos && item.id_pedidos.length > 0 && item.id_produto && item.id_produto.length > 0) {
        return item;
      }
    })

    const pedidosProdutosRepositories = new PedidosProdutosRepositories(cod_cliente);
    await pedidosProdutosRepositories.create(newData);
  }

}