import { ICreateProdutosVariantesDTO } from "../dtos/ICreateProdutosVariantesDTO";
import { ProdutosVariantes } from "../infra/typeorm/entities/ProdutosVariantes";

export interface IProdutosVariantesRepositories {
  create(data: ICreateProdutosVariantesDTO[]): Promise<void>;
  findById(id: string): Promise<ProdutosVariantes>;
  findByProduto(id: string): Promise<ProdutosVariantes[]>;
  findByVariante(id: string): Promise<ProdutosVariantes[]>;
  findByVarianteValor(id: string): Promise<ProdutosVariantes[]>;
  deleteById(id: string): Promise<void>;
}