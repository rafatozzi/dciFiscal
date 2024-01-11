import { ICreateOrdemServicoDTO } from "../dtos/ICreateOrdemServicoDTO";
import { IFilterOrdemServicoDTO } from "../dtos/IFilterOrdemServicoDTO";
import { IListOrdemServicoDTO } from "../dtos/IListOrdemServicoDTO";
import { OrdemServico } from "../infra/typeorm/entities/OrdemServico";

export interface IOrdemServicoRepositories {
  create(data: ICreateOrdemServicoDTO): Promise<OrdemServico>;
  findAll(pesquisa?: IFilterOrdemServicoDTO, limit?: number, cursor?: number): Promise<IListOrdemServicoDTO>;
  findById(id: string): Promise<OrdemServico>;
  deleteById(id: string): Promise<void>;
}