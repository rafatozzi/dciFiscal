import { Caixa } from "../infra/typeorm/entities/Caixa";

export interface IListCaixaDTO {
  total: number;
  result: Caixa[];
}