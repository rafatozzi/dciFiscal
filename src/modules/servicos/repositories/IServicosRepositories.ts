import { ICreateServicoDTO } from "../dtos/ICreateServicoDTO";
import { IListServicosDTO } from "../dtos/IListServicosDTO";
import { Servicos } from "../infra/typeorm/entities/Servicos";

export interface IServicosRepositories {
  create(data: ICreateServicoDTO): Promise<Servicos>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListServicosDTO>
  findById(id: string): Promise<Servicos>;
  findByNome(nome: string): Promise<Servicos>;
  findFavoritos(): Promise<IListServicosDTO>;
  deleteServico(id: string): Promise<void>;
}