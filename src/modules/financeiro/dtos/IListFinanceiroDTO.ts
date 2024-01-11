import { Financeiro } from "../infra/typeorm/entities/Financeiro";

export interface IListFinanceiroDTO {
  total: number;
  result: Financeiro[];
}