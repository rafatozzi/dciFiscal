import { getRepository, Repository } from "typeorm";
import { ICreateNfeProdutosDTO } from "../../../dtos/ICreateNfeProdutosDTO";
import { INfeProdutosRepositories } from "../../../repositories/INfeProdutosRepositories";
import { NfeProdutos } from "../entities/NfeProdutos";

export class NfeProdutosRepositories implements INfeProdutosRepositories {
  private repository: Repository<NfeProdutos>;

  constructor(connectionName: string) {
    this.repository = getRepository(NfeProdutos, connectionName);
  }

  async create(data: ICreateNfeProdutosDTO[]): Promise<void> {
    data.map(async (item) => {
      const produto = this.repository.create({ ...item });

      await this.repository.save(produto);
    });
  }

  async findById(id: string): Promise<NfeProdutos> {
    return await this.repository.findOne(id);
  }

  async findByPedido(id: string): Promise<NfeProdutos[]> {
    return await this.repository.find({ id_nfe: id, excluir: false });
  }

  async deleteNfeProdutos(id: string): Promise<void> {
    const pedProdutos = await this.repository.findOne(id);

    pedProdutos.excluir = true;

    await this.repository.save(pedProdutos);
  }

}