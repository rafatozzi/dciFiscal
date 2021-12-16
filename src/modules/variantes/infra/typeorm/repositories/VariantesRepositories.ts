import { getRepository, Like, Repository } from "typeorm";
import { ICreateVarianteDTO } from "../../../dtos/ICreateVarianteDTO";
import { IListVariantesResponseDTO } from "../../../dtos/IListVariantesResponseDTO";
import { IVariantesRepositories } from "../../../repositories/IVariantesRepositories";
import { Variantes } from "../entities/Variantes";

export class VariantesRepositories implements IVariantesRepositories {
  private repository: Repository<Variantes>;

  constructor() {
    this.repository = getRepository(Variantes);
  }

  async create(data: ICreateVarianteDTO): Promise<Variantes> {
    const variante = this.repository.create({ ...data });

    await this.repository.save(variante);

    return variante;
  }

  async findById(id: string): Promise<Variantes> {
    return await this.repository.findOne(id);
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListVariantesResponseDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    const where =
      pesquisa ?
        { nome: Like(`%${pesquisa}%`), excluir: false } :
        { excluir: false };

    const [result, total] = await this.repository.findAndCount(
      {
        relations: ["variante_valores"],
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

  async deleteVariante(id: string): Promise<void> {
    const variante = await this.repository.findOne(id);

    variante.excluir = true;

    await this.repository.save(variante);
  }

}