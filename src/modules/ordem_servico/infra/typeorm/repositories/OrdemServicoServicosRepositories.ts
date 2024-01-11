import { getRepository, Repository } from "typeorm";
import { ICreateOrdemServicoServicosDTO } from "../../../dtos/ICreateOrdemServicoServicosDTO";
import { IOrdemServicoServicosRepositories } from "../../../repositories/IOrdemServicoServicosRepositories";
import { OrdemServicoServicos } from "../entities/OrdemServicoServicos";

export class OrdemServicoServicosRepositories implements IOrdemServicoServicosRepositories {
  private repository: Repository<OrdemServicoServicos>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServicoServicos, connectionName);
  }

  async create(data: ICreateOrdemServicoServicosDTO[]): Promise<void> {
    data.map(async (item) => {
      const servico = this.repository.create({ ...item });

      await this.repository.save(servico);
    });
  }

  async findById(id: string): Promise<OrdemServicoServicos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["servico"]
      }
    );
  }

  async findByOrdemServico(id: string): Promise<OrdemServicoServicos[]> {
    return await this.repository.find(
      {
        where: { id_ordem_servico: id, excluir: false },
        relations: ["servico"]
      }
    );
  }

  async deleteById(id: string): Promise<void> {
    const servico = await this.repository.findOne(id);

    servico.excluir = true;

    await this.repository.save(servico);
  }
}