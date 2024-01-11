import { Clientes } from "../infra/typeorm/entities/Clientes";

export interface IListClientesResponse {
  total: number;
  result: Clientes[];
}