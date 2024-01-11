import { Empresas } from "../infra/typeorm/entities/Empresas";

export interface IListResponse {
  total: number;
  result: Empresas[];
}