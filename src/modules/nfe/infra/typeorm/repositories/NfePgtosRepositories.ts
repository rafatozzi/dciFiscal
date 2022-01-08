import { getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreateNfePgtosDTO } from "../../../dtos/ICreateNfePgtosDTO";
import { INfePgtosRepositories } from "../../../repositories/INfePgtosRepositories";
import { NfePgtos } from "../entities/NfePgtos";

export class NfePgtosRepositories implements INfePgtosRepositories {
  private repository: Repository<NfePgtos>;

  constructor(connectionName: string) {
    this.repository = getRepository(NfePgtos, connectionName);
  }

  async create(data: ICreateNfePgtosDTO[]): Promise<void> {
    data.map(async (item) => {
      const pgto = this.repository.create({ ...item });

      await this.repository.save(pgto);
    });
  }

  async findById(id: string): Promise<NfePgtos> {
    return await this.repository.findOne(id);
  }

  async findByPedido(id: string): Promise<NfePgtos[]> {
    return await this.repository.find({ id_nfe: id, excluir: false });
  }

  async deleteNfePgtos(id: string): Promise<void> {
    const pedPgtos = await this.repository.findOne(id);

    pedPgtos.excluir = true;

    await this.repository.save(pedPgtos);
  }
}