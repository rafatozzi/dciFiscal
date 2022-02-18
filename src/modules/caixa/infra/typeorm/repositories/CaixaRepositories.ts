import { getRepository, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { ICreateCaixaDTO } from "../../../dtos/ICreateCaixaDTO";
import { IFiltersCaixaDTO } from "../../../dtos/IFiltersCaixaDTO";
import { IListCaixaDTO } from "../../../dtos/IListCaixaDTO";
import { ICaixaRepositories } from "../../../repositories/ICaixaRepositories";
import { Caixa } from "../entities/Caixa";

export class CaixaRepositories implements ICaixaRepositories {
  private repository: Repository<Caixa>;

  constructor(connectionName: string) {
    this.repository = getRepository(Caixa, connectionName);
  }

  async getCaixaAberto(): Promise<Caixa> {
    return await this.repository.findOne(
      {
        where: { fechado: false },
        order: { created_at: "DESC" }
      }
    );
  }

  async create(data: ICreateCaixaDTO): Promise<Caixa> {
    const caixa = this.repository.create({ ...data });

    await this.repository.save(caixa);

    return caixa;
  }

  async findAll(pesquisa?: IFiltersCaixaDTO, limit?: number, cursor?: number): Promise<IListCaixaDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {

      if (typeof pesquisa.fechado === "boolean")
        where = { ...where, concluido: pesquisa.fechado };

      if (pesquisa.date_ini)
        where = { ...where, data_agendamento: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.date_fin)
        where = { ...where, data_agendamento: LessThanOrEqual(pesquisa.date_fin) };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        order: { created_at: "DESC" },
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

  async findById(id: string): Promise<Caixa> {
    return await this.repository.findOne(id);
  }
}