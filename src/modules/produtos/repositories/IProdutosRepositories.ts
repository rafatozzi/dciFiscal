import { ICreateProdutosDTO } from "../dtos/ICreateProdutosDTO";
import { IListProdutosDTO } from "../dtos/IListProdutosDTO";
import { Produtos } from "../infra/typeorm/entities/Produtos";

export interface IProdutosRepositories {
  create(data: ICreateProdutosDTO): Promise<Produtos>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListProdutosDTO>
  findById(id: string): Promise<Produtos>;
  findByCodBarras(codigo_barras: string): Promise<Produtos>;
  deleteProduto(id: string): Promise<void>;
}