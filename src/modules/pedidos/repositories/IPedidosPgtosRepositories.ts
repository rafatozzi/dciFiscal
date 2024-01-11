import { ICreatePedidosPgtosDTO } from "../dtos/ICreatePedidosPgtosDTO";
import { PedidosPgtos } from "../infra/typeorm/entities/PedidosPgtos";

export interface IPedidosPgtosRepositories {
  create(data: ICreatePedidosPgtosDTO[]): Promise<void>;
  findById(id: string): Promise<PedidosPgtos>;
  findByPedido(id: string): Promise<PedidosPgtos[]>;
  deletePedidosPgtos(id: string): Promise<void>;
}