import { getRepository, Repository } from "typeorm";
import { ICreateServicoComissaoDTO } from "../../../dtos/ICreateServicoComissaoDTO";
import { IServicosComissaoRepositories } from "../../../repositories/IServicosComissaoRepositories";
import { ServicosComissao } from "../entities/ServicosComissao";

export class ServicosComissaoRepositories implements IServicosComissaoRepositories {
  private repository: Repository<ServicosComissao>;

  constructor(connectionName: string) {
    this.repository = getRepository(ServicosComissao, connectionName);
  }

  async create(data: ICreateServicoComissaoDTO[]): Promise<void> {
    data.map(async (item) => {
      const variante = this.repository.create({ ...item });

      await this.repository.save(variante);
    });
  }

  async findById(id: string): Promise<ServicosComissao> {
    return await this.repository.findOne(
      id,
      {
        relations: ["usuario"]
      }
    );
  }

  async findByServico(id: string): Promise<ServicosComissao[]> {
    return await this.repository.find({
      relations: ["usuario"],
      where: { id_servico: id, excluir: false }
    });
  }

  async deleteById(id: string): Promise<void> {
    const checkList = await this.repository.findOne(id);

    checkList.excluir = true;

    await this.repository.save(checkList);
  }

}