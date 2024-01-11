import { Status } from "../infra/typeorm/entities/Status";

export interface IListStatusDTO {
  total: number;
  result: Status[];
}