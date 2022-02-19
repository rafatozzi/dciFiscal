import { getRepository, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";
import { ICreateFinanceiroDTO } from "../../../dtos/ICreateFinanceiroDTO";
import { IFiltersFinanceiroDTO } from "../../../dtos/IFiltersFinanceiroDTO";
import { IListFinanceiroDTO } from "../../../dtos/IListFinanceiroDTO";
import { IFinanceiroRepositories } from "../../../repositories/IFinanceiroRepositories";
import { Financeiro } from "../entities/Financeiro";

export class FinanceiroRepositories implements IFinanceiroRepositories {
  private repository: Repository<Financeiro>;

  constructor(connectionName: string) {
    this.repository = getRepository(Financeiro, connectionName);
  }

  async create(data: ICreateFinanceiroDTO): Promise<Financeiro> {
    const financeiro = this.repository.create({ ...data });

    await this.repository.save(financeiro);

    return financeiro;
  }

  async findAll(pesquisa?: IFiltersFinanceiroDTO, limit?: number, cursor?: number): Promise<IListFinanceiroDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {

      if (pesquisa.id_ordem_servico_pgtos)
        where = { ...where, id_ordem_servico_pgtos: pesquisa.id_ordem_servico_pgtos };

      if (pesquisa.descricao)
        where = { ...where, descricao: Like(`%${pesquisa.descricao}%`) };

      if (pesquisa.date_ini)
        where = { ...where, created_at: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.date_fin)
        where = { ...where, created_at: LessThanOrEqual(pesquisa.date_fin) };

      if (pesquisa.valor_ini)
        where = { ...where, created_at: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.valor_fin)
        where = { ...where, created_at: LessThanOrEqual(pesquisa.date_fin) };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        relations: [
          "caixa",
          "ordemServicoPgto",
          "ordemServicoPgto.formaPgto",
          "ordemServicoPgto.bandeira"
        ],
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

  async findById(id: string): Promise<Financeiro> {
    return await this.repository.findOne(
      id,
      {
        relations: [
          "caixa",
          "ordemServicoPgto",
          "ordemServicoPgto.formaPgto",
          "ordemServicoPgto.bandeira"
        ]
      }
    );
  }

  async deleteById(id: string): Promise<void> {
    const financeiro = await this.repository.findOne(id);

    financeiro.excluir = true;

    await this.repository.save(financeiro);
  }
}