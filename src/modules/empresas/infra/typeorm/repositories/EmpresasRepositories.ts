import { getRepository, Like, Repository } from "typeorm";
import { Empresas } from "../entities/Empresas";
import { IEmpresasRepositories } from "../../../repositories/IEmpresasRepositories";
import { ICreateEmpresasDTO } from "../../../dtos/ICreateEmpresasDTO";
import { IListResponse } from "../../../dtos/IListResponse";

export class EmpresasRepositories implements IEmpresasRepositories {
  private repository: Repository<Empresas>;

  constructor() {
    this.repository = getRepository(Empresas);
  }

  async findByCNPJ(cnpj: number): Promise<Empresas> {
    const empresa = await this.repository.findOne({ cnpj });

    return empresa;
  }

  async create(data: ICreateEmpresasDTO): Promise<Empresas> {
    const empresa = this.repository.create({ ...data });

    await this.repository.save(empresa);

    return empresa;
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListResponse> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa)
      where = [
        { razao: Like(`%${pesquisa}%`), excluir: false },
        { fantasia: Like(`%${pesquisa}%`), excluir: false }
      ];

    const [result, total] = await this.repository.findAndCount(
      {
        order: { fantasia: "ASC" },
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

  async findById(id: string): Promise<Empresas> {
    return await this.repository.findOne(id);
  }

  async deleteById(id: string): Promise<void> {
    const empresa = await this.repository.findOne(id);

    empresa.excluir = true;

    await this.repository.save(empresa);
  }

}