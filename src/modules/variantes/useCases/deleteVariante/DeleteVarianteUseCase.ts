import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class DeleteVarianteUseCase {

  constructor(
    @inject("VariantesRepositories")
    private variantesRepositories: VariantesRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const variante = await this.variantesRepositories.findById(id);

    if (!variante)
      throw new AppError("Variante não encontrada");

    await this.variantesRepositories.deleteVariante(id);
  }

}