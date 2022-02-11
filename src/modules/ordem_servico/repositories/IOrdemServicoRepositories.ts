import { ICreateOrdemServicoDTO } from "../dtos/ICreateOrdemServicoDTO";
import { OrdemServico } from "../infra/typeorm/entities/OrdemServico";

export interface IOrdemServicoRepositories {
  create(data: ICreateOrdemServicoDTO): Promise<OrdemServico>;
  findById(id: string): Promise<OrdemServico>;
  deleteById(id: string): Promise<void>;
}