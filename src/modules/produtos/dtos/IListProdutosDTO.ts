import { Produtos } from "../infra/typeorm/entities/Produtos";

export interface IListProdutosDTO {
  total: number;
  result: Produtos[];
}