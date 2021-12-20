import { injectable } from "tsyringe";
import { ICreatePedidosDTO } from "../../dtos/ICreatePedidosDTO";
import { Pedidos } from "../../infra/typeorm/entities/Pedidos";
import { PedidosRepositories } from "../../infra/typeorm/repositories/PedidosRepositories";

@injectable()
export class CreatePedidoUseCase {

  constructor(
    // @inject("PedidosRepositories")
    // private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreatePedidosDTO): Promise<Pedidos> {
    const pedidosRepositories = new PedidosRepositories(cod_cliente);
    const produto = await pedidosRepositories.create(data);

    return produto;
  }

}