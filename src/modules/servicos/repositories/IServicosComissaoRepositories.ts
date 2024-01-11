import { ICreateServicoComissaoDTO } from "../dtos/ICreateServicoComissaoDTO";
import { ServicosComissao } from "../infra/typeorm/entities/ServicosComissao";

export interface IServicosComissaoRepositories {
  create(data: ICreateServicoComissaoDTO[]): Promise<void>;
  findById(id: string): Promise<ServicosComissao>;
  findByServico(id: string): Promise<ServicosComissao[]>;
  deleteById(id: string): Promise<void>;
}