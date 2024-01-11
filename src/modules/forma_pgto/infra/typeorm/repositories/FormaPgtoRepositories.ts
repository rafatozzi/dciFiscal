import { getRepository, Like, Repository } from "typeorm";
import { ICreateFormaPgtoDTO } from "../../../dtos/ICreateFormaPgtoDTO";
import { IListFormaPgtosDTO } from "../../../dtos/IListFormaPgtosDTO";
import { IFormaPgtoRepositories } from "../../../repositories/IFormaPgtoRepositories";
import { FormaPgto } from "../entities/FormaPgto";

export class FormaPgtoRepositories implements IFormaPgtoRepositories {
  private repository: Repository<FormaPgto>;

  constructor(connectionName: string) {
    this.repository = getRepository(FormaPgto, connectionName);
  }

  async create(data: ICreateFormaPgtoDTO): Promise<FormaPgto> {
    const formaPgto = this.repository.create({ ...data });

    await this.repository.save(formaPgto);

    return formaPgto;
  }

  async findAll(pesquisa?: string): Promise<IListFormaPgtosDTO> {

    const where =
      pesquisa && pesquisa.length > 0 ?
        { nome: Like(`%${pesquisa}%`), excluir: false }
        :
        { excluir: false };

    const [result, total] = await this.repository.findAndCount({
      where,
      order: { nome: "ASC" },
      relations: ["bandeiras", "bandeiras.taxas"]
    });

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<FormaPgto> {
    return await this.repository.findOne(
      id,
      {
        relations: ["bandeiras", "bandeiras.taxas"]
      }
    );
  }

  async findByNome(nome: string): Promise<FormaPgto> {
    return await this.repository.findOne({ nome, excluir: false });
  }

  async deleteFormaPgto(id: string): Promise<void> {
    const formaPgto = await this.repository.findOne(id);

    formaPgto.excluir = true;

    await this.repository.save(formaPgto);
  }
}