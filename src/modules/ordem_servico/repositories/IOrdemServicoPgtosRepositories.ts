import { ICreateOrdemServicoPgtosDTO } from "../dtos/ICreateOrdemServicoPgtosDTO";
import { OrdemServicoPgtos } from "../infra/typeorm/entities/OrdemServicoPgtos";

export interface IOrdemServicoPgtosRepositories {
  create(data: ICreateOrdemServicoPgtosDTO): Promise<OrdemServicoPgtos>;
  findById(id: string): Promise<OrdemServicoPgtos>;
  findByOrdemServico(id: string): Promise<OrdemServicoPgtos[]>;
  deleteById(id: string): Promise<void>;
}