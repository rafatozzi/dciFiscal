import { getRepository, Like, Repository } from "typeorm";
import { ICreateServicoDTO } from "../../../dtos/ICreateServicoDTO";
import { IListServicosDTO } from "../../../dtos/IListServicosDTO";
import { IServicosRepositories } from "../../../repositories/IServicosRepositories";
import { Servicos } from "../entities/Servicos";

export class ServicosRepositories implements IServicosRepositories {
  private repository: Repository<Servicos>;

  constructor(connectionName: string) {
    this.repository = getRepository(Servicos, connectionName);
  }

  async create(data: ICreateServicoDTO): Promise<Servicos> {
    const servico = this.repository.create({ ...data });

    await this.repository.save(servico);

    return servico;
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListServicosDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    const where =
      pesquisa ?
        [
          { nome: Like(`%${pesquisa}%`), excluir: false },
        ] :
        { excluir: false };

    const [result, total] = await this.repository.findAndCount(
      {
        relations: ["ckecklist", "comissao", "comissao.usuario"],
        order: { nome: "ASC" },
        take: limitPage,
        skip: cursorPage,
        where
      }
    )

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<Servicos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["ckecklist", "comissao", "comissao.usuario"]
      }
    );
  }

  async deleteServico(id: string): Promise<void> {
    const servico = await this.repository.findOne(id);

    servico.excluir = true;

    await this.repository.save(servico);
  }

}