import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IVariantesValoresRepositories } from "../../repositories/IVariantesValoresRepositories";

@injectable()
export class DeleteVarianteValoresUseCase {

  constructor(
    @inject("VariantesValoresRepositories")
    private variantesValoresRepositories: IVariantesValoresRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const varianteVal = await this.variantesValoresRepositories.findById(id);

    if (!varianteVal)
      throw new AppError("Valor da Variante não encontrada");

    await this.variantesValoresRepositories.deleteById(id);

  }
}