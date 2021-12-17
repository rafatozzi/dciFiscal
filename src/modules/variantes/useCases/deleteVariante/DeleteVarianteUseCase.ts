import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IVariantesRepositories } from "../../repositories/IVariantesRepositories";

@injectable()
export class DeleteVarianteUseCase {

  constructor(
    @inject("VariantesRepositories")
    private variantesRepositories: IVariantesRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const variante = await this.variantesRepositories.findById(id);

    if (!variante)
      throw new AppError("Variante não encontrada");

    await this.variantesRepositories.deleteVariante(id);
  }

}