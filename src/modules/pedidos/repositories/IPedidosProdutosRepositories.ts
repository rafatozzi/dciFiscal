import { ICreatePedidosProdutosDTO } from "../dtos/ICreatePedidosProdutosDTO";
import { PedidosProdutos } from "../infra/typeorm/entities/PedidosProdutos";

export interface IPedidosProdutosRepositories {
  create(data: ICreatePedidosProdutosDTO[]): Promise<void>;
  findById(id: string): Promise<PedidosProdutos>;
  findByPedido(id: string): Promise<PedidosProdutos[]>;
  deletePedidosProdutos(id: string): Promise<void>;
}