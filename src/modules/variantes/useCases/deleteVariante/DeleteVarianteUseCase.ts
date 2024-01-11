import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class DeleteVarianteUseCase {

  constructor(
    // @inject("VariantesRepositories")
    // private variantesRepositories: IVariantesRepositories
  ) { }

  async execute(cod_Cliente: string, id: string): Promise<void> {
    const variantesRepositories = new VariantesRepositories(cod_Cliente);
    const variante = await variantesRepositories.findById(id);

    if (!variante)
      throw new AppError("Variante não encontrada");

    await variantesRepositories.deleteVariante(id);
  }

}