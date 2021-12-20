import { inject, injectable } from "tsyringe";
import { IFiltersPedidosDTO } from "../../dtos/IFiltersPedidosDTO";
import { IListPedidosDTO } from "../../dtos/IListPedidosDTO";
import { IPedidosRepositories } from "../../repositories/IPedidosRepositories";

@injectable()
export class FindAllPedidosUseCase {

  constructor(
    @inject("PedidosRepositories")
    private pedidosRepositories: IPedidosRepositories
  ) { }

  async execute(pesquisa?: IFiltersPedidosDTO, limit?: number, cursor?: number): Promise<IListPedidosDTO> {
    const result = await this.pedidosRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}