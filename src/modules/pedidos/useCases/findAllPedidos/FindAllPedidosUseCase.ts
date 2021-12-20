import { injectable } from "tsyringe";
import { IFiltersPedidosDTO } from "../../dtos/IFiltersPedidosDTO";
import { IListPedidosDTO } from "../../dtos/IListPedidosDTO";
import { PedidosRepositories } from "../../infra/typeorm/repositories/PedidosRepositories";

@injectable()
export class FindAllPedidosUseCase {

  constructor(
    // @inject("PedidosRepositories")
    // private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: IFiltersPedidosDTO, limit?: number, cursor?: number): Promise<IListPedidosDTO> {
    const pedidosRepositories = new PedidosRepositories(cod_cliente);
    const result = await pedidosRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}