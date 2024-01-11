import { Servicos } from "../infra/typeorm/entities/Servicos";

export interface IListServicosDTO {
  total: number;
  result: Servicos[];
}