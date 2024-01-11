import { ICreateOrdemServicoProdutosDTO } from "../dtos/ICreateOrdemServicoProdutosDTO";
import { OrdemServicoProdutos } from "../infra/typeorm/entities/OrdemServicoProdutos";

export interface IOrdemServicoProdutosRepositories {
  create(data: ICreateOrdemServicoProdutosDTO[]): Promise<void>;
  findById(id: string): Promise<OrdemServicoProdutos>;
  findByOrdemServico(id: string): Promise<OrdemServicoProdutos[]>;
  deleteById(id: string): Promise<void>;
}