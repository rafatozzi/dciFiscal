import { ICreateOrdemServicoStatusDTO } from "../dtos/ICreateOrdemServicoStatusDTO";
import { OrdemServicoStatus } from "../infra/typeorm/entities/OrdemServicoStatus";

export interface IOrdemServicoStatusRepositories {
  create(data: ICreateOrdemServicoStatusDTO[]): Promise<void>;
  findById(id: string): Promise<OrdemServicoStatus>;
  findByOrdemServico(id: string): Promise<OrdemServicoStatus[]>;
}