import { getRepository, Repository } from "typeorm";
import { ICreateOrdemServicoStatusDTO } from "../../../dtos/ICreateOrdemServicoStatusDTO";
import { IOrdemServicoStatusRepositories } from "../../../repositories/IOrdemServicoStatusRepositories";
import { OrdemServicoStatus } from "../entities/OrdemServicoStatus";

export class OrdemServicoStatusRepositories implements IOrdemServicoStatusRepositories {
  private repository: Repository<OrdemServicoStatus>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServicoStatus, connectionName);
  }

  async create(data: ICreateOrdemServicoStatusDTO[]): Promise<void> {
    data.map(async (item) => {
      const status = this.repository.create({ ...item });

      await this.repository.save(status);
    });
  }

  async findById(id: string): Promise<OrdemServicoStatus> {
    return await this.repository.findOne(
      id,
      {
        relations: ["status"]
      }
    );
  }

  async findByOrdemServico(id: string): Promise<OrdemServicoStatus[]> {
    return await this.repository.find(
      {
        where: { id_ordem_servico: id, excluir: false },
        relations: ["status"]
      }
    );
  }
}