import { HistEnvioContabil } from "../infra/typeorm/entities/HistEnvioContabil";

export interface IListHistEnvioContabil {
  total: number;
  result: HistEnvioContabil[];
}