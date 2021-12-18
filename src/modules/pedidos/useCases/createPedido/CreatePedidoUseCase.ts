import { inject, injectable } from "tsyringe";
import { ICreatePedidosDTO } from "../../dtos/ICreatePedidosDTO";
import { Pedidos } from "../../infra/typeorm/entities/Pedidos";
import { IPedidosRepositories } from "../../repositories/IPedidosRepositories";

@injectable()
export class CreatePedidoUseCase {

  constructor(
    @inject("PedidosRepositories")
    private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(data: ICreatePedidosDTO): Promise<Pedidos> {
    const produto = await this.pedidosRepositories.create(data);

    return produto;
  }

}