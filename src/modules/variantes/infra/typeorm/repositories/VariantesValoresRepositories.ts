import { getRepository, Repository } from "typeorm";
import { ICreateVariantesValoresDTO } from "../../../dtos/ICreateVariantesValoresDTO";
import { IVariantesValoresRepositories } from "../../../repositories/IVariantesValoresRepositories";
import { VariantesValores } from "../entities/VariantesValores";

export class VariantesValoresRepositories implements IVariantesValoresRepositories {
  private repository: Repository<VariantesValores>;

  constructor() {
    this.repository = getRepository(VariantesValores);
  }

  async create(data: ICreateVariantesValoresDTO[]): Promise<void> {
    data.map(async (item) => {
      const variante = this.repository.create({ ...item });

      await this.repository.save(variante);
    });
  }

  async findById(id: string): Promise<VariantesValores> {
    return await this.repository.findOne(id);
  }

  async findByVariante(id_variante: string): Promise<VariantesValores[]> {
    return await this.repository.find({
      where: { id_variante, excluir: false },
      order: { nome: "ASC" }
    })
  }

  async deleteById(id: string): Promise<void> {
    const varianteValores = await this.repository.findOne(id);

    varianteValores.excluir = true;

    await this.repository.save(varianteValores);
  }

}