import { getRepository, Repository } from "typeorm";
import { ICreateFormaPgtoBandTaxasDTO } from "../../../dtos/ICreateFormaPgtoBandTaxasDTO";
import { IFormaPgtoBandTaxasRepositories } from "../../../repositories/IFormaPgtoBandTaxasRepositories";
import { FormaPgtoBandTaxas } from "../entities/FormaPgtoBandTaxas";

export class FormaPgtoBandTaxasRepositories implements IFormaPgtoBandTaxasRepositories {
  private repository: Repository<FormaPgtoBandTaxas>;

  constructor(connectionName: string) {
    this.repository = getRepository(FormaPgtoBandTaxas, connectionName);
  }

  async create(data: ICreateFormaPgtoBandTaxasDTO[]): Promise<void> {
    data.map(async (item) => {
      const taxa = this.repository.create({ ...item });

      await this.repository.save(taxa);
    });
  }

  async findById(id: string): Promise<FormaPgtoBandTaxas> {
    return await this.repository.findOne(id);
  }

  async findByFormaPgtoBand(id: string): Promise<FormaPgtoBandTaxas[]> {
    return await this.repository.find({ id_forma_pgto_band: id, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const taxa = await this.repository.findOne(id);

    taxa.excluir = true;

    await this.repository.save(taxa);
  }
}