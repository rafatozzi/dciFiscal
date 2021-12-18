import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreatePedidosProdutosDTO } from "../../dtos/ICreatePedidosProdutosDTO";
import { IPedidosProdutosRepositories } from "../../repositories/IPedidosProdutosRepositories";

@injectable()
export class CreatePedidoProdutosUseCase {

  constructor(
    @inject("PedidosProdutosRepositories")
    private pedidosProdutosRepositories: IPedidosProdutosRepositories
  ) { }

  async execute(data: ICreatePedidosProdutosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const newData = data.map((item) => {
      if (item.id_pedidos && item.id_pedidos.length > 0 && item.id_produto && item.id_produto.length > 0) {
        return item;
      }
    })

    await this.pedidosProdutosRepositories.create(newData);
  }

}