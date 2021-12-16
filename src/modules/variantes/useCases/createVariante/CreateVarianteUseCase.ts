import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateVarianteDTO } from "../../dtos/ICreateVarianteDTO";
import { Variantes } from "../../infra/typeorm/entities/Variantes";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class CreateVarianteUseCase {

  constructor(
    @inject("VariantesRepositories")
    private variantesRepositories: VariantesRepositories
  ) { }

  async execute(data: ICreateVarianteDTO): Promise<Variantes> {
    if (!data.id) {
      const alreadyExists = await this.variantesRepositories.findByNome(data.nome);

      if (alreadyExists)
        throw new AppError("Variante já cadastrada");
    }

    const variante = await this.variantesRepositories.create(data);

    return variante;
  }

}