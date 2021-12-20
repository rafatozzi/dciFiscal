import { getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreatePedidosPgtosDTO } from "../../../dtos/ICreatePedidosPgtosDTO";
import { IPedidosPgtosRepositories } from "../../../repositories/IPedidosPgtosRepositories";
import { PedidosPgtos } from "../entities/PedidosPgtos";

export class PedidosPgtosRepositories implements IPedidosPgtosRepositories {
  private repository: Repository<PedidosPgtos>;

  constructor(connectionName: string) {
    this.repository = getRepository(PedidosPgtos, connectionName);
  }

  async create(data: ICreatePedidosPgtosDTO[]): Promise<void> {
    data.map(async (item) => {
      const pgto = this.repository.create({ ...item });

      await this.repository.save(pgto);
    });
  }

  async findById(id: string): Promise<PedidosPgtos> {
    return await this.repository.findOne(id);
  }

  async findByPedido(id: string): Promise<PedidosPgtos[]> {
    return await this.repository.find({ id_pedidos: id, excluir: false });
  }

  async deletePedidosPgtos(id: string): Promise<void> {
    const pedPgtos = await this.repository.findOne(id);

    pedPgtos.excluir = true;

    await this.repository.save(pedPgtos);
  }
}