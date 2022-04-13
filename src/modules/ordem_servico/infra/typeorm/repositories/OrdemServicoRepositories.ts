import { getRepository, LessThanOrEqual, MoreThanOrEqual, Repository, Between } from "typeorm";
import { ICreateOrdemServicoDTO } from "../../../dtos/ICreateOrdemServicoDTO";
import { IFilterOrdemServicoDTO } from "../../../dtos/IFilterOrdemServicoDTO";
import { IListOrdemServicoDTO } from "../../../dtos/IListOrdemServicoDTO";
import { IOrdemServicoRepositories } from "../../../repositories/IOrdemServicoRepositories";
import { OrdemServico } from "../entities/OrdemServico";

export class OrdemServicoRepositories implements IOrdemServicoRepositories {
  private repository: Repository<OrdemServico>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServico, connectionName);
  }

  async findAll(pesquisa?: IFilterOrdemServicoDTO, limit?: number, cursor?: number): Promise<IListOrdemServicoDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {
      if (pesquisa.cliente)
        where = { ...where, id_cliente: pesquisa.cliente };

      if (pesquisa.user)
        where = { ...where, id_user: pesquisa.user };

      if (pesquisa.date_ini && pesquisa.date_fin)
        where = { ...where, created_at: Between(pesquisa.date_ini, pesquisa.date_fin) };

      if (pesquisa.id_status)
        where = { ...where, id_status: pesquisa.id_status };

      if (pesquisa.id_empresa)
        where = { ...where, id_empresa: pesquisa.id_empresa };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        relations: [
          "empresa",
          "cliente",
          "usuario",
          "observacoes",
          "observacoes.usuario",
          "pgtos",
          "pgtos.formaPgto",
          "pgtos.bandeira",
          "produtos",
          "produtos.produto",
          "servicos",
          "servicos.servico",
          "status",
          "status.status",
          "ult_status"
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

  async create(data: ICreateOrdemServicoDTO): Promise<OrdemServico> {
    const ordemServico = this.repository.create({ ...data });

    await this.repository.save(ordemServico);

    return ordemServico;
  }

  async findById(id: string): Promise<OrdemServico> {
    return await this.repository.findOne(
      id,
      {
        relations: [
          "empresa",
          "cliente",
          "usuario",
          "observacoes",
          "pgtos",
          "pgtos.formaPgto",
          "produtos",
          "produtos.produto",
          "servicos",
          "servicos.servico",
          "status",
          "status.status"
        ]
      }
    )
  }

  async deleteById(id: string): Promise<void> {
    const ordemServico = await this.repository.findOne(id);

    ordemServico.excluir = true;

    await this.repository.save(ordemServico);
  }
}