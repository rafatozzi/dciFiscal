import { getRepository, Repository } from "typeorm";
import { ICreateOrdemServicoObsDTO } from "../../../dtos/ICreateOrdemServicoObsDTO";
import { IOrdemServicoObsRepositories } from "../../../repositories/IOrdemServicoObsRepositories";
import { OrdemServicoObs } from "../entities/OrdemServicoObs";

export class OrdemServicoObsRepositories implements IOrdemServicoObsRepositories {
  private repository: Repository<OrdemServicoObs>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServicoObs, connectionName);
  }

  async create(data: ICreateOrdemServicoObsDTO[], id_user: string): Promise<void> {
    data.map(async (item) => {

      if (!item.id)
        item.id_user = id_user;

      const obs = this.repository.create({ ...item });

      await this.repository.save(obs);
    });
  }

  async findById(id: string): Promise<OrdemServicoObs> {
    return await this.repository.findOne(id);
  }

  async findByOrdemServico(id: string): Promise<OrdemServicoObs[]> {
    return await this.repository.find({ id_ordem_servico: id, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const obs = await this.repository.findOne(id);

    obs.excluir = true;

    await this.repository.save(obs);
  }
}