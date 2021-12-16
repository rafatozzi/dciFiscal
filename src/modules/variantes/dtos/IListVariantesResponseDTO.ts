import { Variantes } from "../infra/typeorm/entities/Variantes";

export interface IListVariantesResponseDTO {
  total: number;
  result: Variantes[];
}