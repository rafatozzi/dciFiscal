import { OrdemServico } from "../infra/typeorm/entities/OrdemServico";

export interface IListOrdemServicoDTO {
  total: number;
  result: OrdemServico[];
}