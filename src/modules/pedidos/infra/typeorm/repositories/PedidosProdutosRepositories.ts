import { getRepository, Repository } from "typeorm";
import { ICreatePedidosProdutosDTO } from "../../../dtos/ICreatePedidosProdutosDTO";
import { IPedidosProdutosRepositories } from "../../../repositories/IPedidosProdutosRepositories";
import { PedidosProdutos } from "../entities/PedidosProdutos";

export class PedidosProdutosRepositories implements IPedidosProdutosRepositories {
  private repository: Repository<PedidosProdutos>;

  constructor(connectionName: string) {
    this.repository = getRepository(PedidosProdutos, connectionName);
  }

  async create(data: ICreatePedidosProdutosDTO[]): Promise<void> {
    data.map(async (item) => {
      const produto = this.repository.create({ ...item });

      await this.repository.save(produto);
    });
  }

  async findById(id: string): Promise<PedidosProdutos> {
    return await this.repository.findOne(id);
  }

  async findByPedido(id: string): Promise<PedidosProdutos[]> {
    return await this.repository.find({ id_pedidos: id, excluir: false });
  }

  async deletePedidosProdutos(id: string): Promise<void> {
    const pedProdutos = await this.repository.findOne(id);

    pedProdutos.excluir = true;

    await this.repository.save(pedProdutos);
  }

}