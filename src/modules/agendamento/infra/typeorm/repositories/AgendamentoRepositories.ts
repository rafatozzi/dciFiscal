import { getRepository, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { ICreateAgendamentoDTO } from "../../../dtos/ICreateAgendamentoDTO";
import { IFiltersAgendamentoDTO } from "../../../dtos/IFiltersAgendamentoDTO";
import { IListAgendamentoDTO } from "../../../dtos/IListAgendamentoDTO";
import { IAgendamentoRepositories } from "../../../repositories/IAgendamentoRepositories";
import { Agendamentos } from "../entities/Agendamento";

export class AgendamentoRepositories implements IAgendamentoRepositories {
  private repository: Repository<Agendamentos>;

  constructor(connectionName: string) {
    this.repository = getRepository(Agendamentos, connectionName);
  }

  async create(data: ICreateAgendamentoDTO): Promise<Agendamentos> {
    const agendamento = this.repository.create({ ...data });

    await this.repository.save(agendamento);

    return agendamento;
  }

  async findAll(pesquisa?: IFiltersAgendamentoDTO, limit?: number, cursor?: number, orderBy?: any): Promise<IListAgendamentoDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {
      if (pesquisa.cliente)
        where = { ...where, id_cliente: pesquisa.cliente };

      if (typeof pesquisa.concluido === "boolean")
        where = { ...where, concluido: pesquisa.concluido };

      if (pesquisa.date_ini)
        where = { ...where, data_agendamento: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.date_fin)
        where = { ...where, data_agendamento: LessThanOrEqual(pesquisa.date_fin) };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        order: orderBy ? orderBy : { created_at: "DESC" },
        take: limitPage,
        skip: cursorPage,
        where,
        relations: ["cliente"]
      }
    )

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<Agendamentos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["cliente"]
      }
    )
  }

  async deleteById(id: string): Promise<void> {
    const agendamento = await this.repository.findOne(id);

    agendamento.excluir = true;

    await this.repository.save(agendamento);
  }

}