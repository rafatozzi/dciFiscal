import { ICreateOrdemServicoServicosDTO } from "../dtos/ICreateOrdemServicoServicosDTO";
import { OrdemServicoServicos } from "../infra/typeorm/entities/OrdemServicoServicos";

export interface IOrdemServicoServicosRepositories {
  create(data: ICreateOrdemServicoServicosDTO[]): Promise<void>;
  findById(id: string): Promise<OrdemServicoServicos>;
  findByOrdemServico(id: string): Promise<OrdemServicoServicos[]>;
  deleteById(id: string): Promise<void>;
}