import { Nfe } from "../infra/typeorm/entities/Nfe";

export interface IListNfeDTO {
  total: number;
  result: Nfe[];
}