import { FormaPgto } from "../infra/typeorm/entities/FormaPgto";

export interface IListFormaPgtosDTO {
  total: number;
  result: FormaPgto[];
}