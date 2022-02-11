import { ICreateOrdemServicoObsDTO } from "../dtos/ICreateOrdemServicoObsDTO";
import { OrdemServicoObs } from "../infra/typeorm/entities/OrdemServicoObs";

export interface IOrdemServicoObsRepositories {
  create(data: ICreateOrdemServicoObsDTO[]): Promise<void>;
  findById(id: string): Promise<OrdemServicoObs>;
  findByOrdemServico(id: string): Promise<OrdemServicoObs[]>;
  deleteById(id: string): Promise<void>;
}