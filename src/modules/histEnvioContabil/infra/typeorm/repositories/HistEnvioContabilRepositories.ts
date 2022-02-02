import { getRepository, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { ICreateHistEnvioContabil } from "../../../dtos/ICreateHistEnvioContabil";
import { IFilterHistEnvioContabil } from "../../../dtos/IFilterHistEnvioContabil";
import { IListHistEnvioContabil } from "../../../dtos/IListHistEnvioContabil";
import { IHistEnvioContabilRepositories } from "../../../repositories/IHistEnvioContabilRepositories";
import { HistEnvioContabil } from "../entities/HistEnvioContabil";

export class HistEnvioContabilRepositories implements IHistEnvioContabilRepositories {
  private repository: Repository<HistEnvioContabil>;

  constructor(connectionName: string) {
    this.repository = getRepository(HistEnvioContabil, connectionName);
  }

  async create(data: ICreateHistEnvioContabil): Promise<HistEnvioContabil> {
    const hist = this.repository.create({ ...data });

    await this.repository.save(hist);

    return hist;
  }

  async findAll(pesquisa?: IFilterHistEnvioContabil, limit?: number, cursor?: number): Promise<IListHistEnvioContabil> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {
      if (pesquisa.empresa)
        where = { ...where, id_empresa: pesquisa.empresa };

      if (pesquisa.date_ini)
        where = { ...where, created_at: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.date_fin)
        where = { ...where, created_at: LessThanOrEqual(pesquisa.date_fin) };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        relations: ["empresa"],
        order: { created_at: "DESC" },
        take: limitPage,
        skip: cursorPage,
        where
      }
    );

    return {
      total,
      result
    };
  }

  async findById(id: string): Promise<HistEnvioContabil> {
    return await this.repository.findOne(
      id,
      {
        relations: [
          "empresa"
        ]
      }
    );
  }

}