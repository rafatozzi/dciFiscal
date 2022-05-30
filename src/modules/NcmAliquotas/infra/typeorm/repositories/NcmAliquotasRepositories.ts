import { getRepository, Repository } from "typeorm";
import { ICreateNcmAliquotaDTO } from "../../../dtos/ICreateNcmAliquotaDTO";
import { INcmAliquotasRepositories } from "../../../repositories/INcmAliquotasRepositories";
import { NcmAliquotas } from "../entities/NcmAliquotas";

export class NcmAliquotasRepositories implements INcmAliquotasRepositories {
  private repository: Repository<NcmAliquotas>;

  constructor(connectionName: string) {
    this.repository = getRepository(NcmAliquotas, connectionName);
  }

  async findByNcm(ncm: string): Promise<NcmAliquotas> {
    return await this.repository.findOne({ ncm });
  }

  async create(data: ICreateNcmAliquotaDTO): Promise<NcmAliquotas> {
    const aliquota = this.repository.create({ ...data });

    await this.repository.save(aliquota);

    return aliquota;
  }
}