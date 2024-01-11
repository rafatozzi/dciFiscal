import { Pedidos } from "../infra/typeorm/entities/Pedidos";

export interface IListPedidosDTO {
  total: number;
  result: Pedidos[];
}