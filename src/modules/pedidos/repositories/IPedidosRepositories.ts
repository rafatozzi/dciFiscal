import { ICreatePedidosDTO } from "../dtos/ICreatePedidosDTO";
import { IFiltersPedidosDTO } from "../dtos/IFiltersPedidosDTO";
import { IListPedidosDTO } from "../dtos/IListPedidosDTO";
import { Pedidos } from "../infra/typeorm/entities/Pedidos";

export interface IPedidosRepositories {
  create(data: ICreatePedidosDTO): Promise<Pedidos>;
  findAll(pesquisa?: IFiltersPedidosDTO, limit?: number, cursor?: number): Promise<IListPedidosDTO>
  findById(id: string): Promise<Pedidos>;
  deletePedido(id: string): Promise<void>;
}