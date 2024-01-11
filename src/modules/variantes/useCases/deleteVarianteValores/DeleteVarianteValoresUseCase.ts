import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { VariantesValoresRepositories } from "../../infra/typeorm/repositories/VariantesValoresRepositories";

@injectable()
export class DeleteVarianteValoresUseCase {

  constructor(
    // @inject("VariantesValoresRepositories")
    // private variantesValoresRepositories: IVariantesValoresRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const variantesValoresRepositories = new VariantesValoresRepositories(cod_cliente);
    const varianteVal = await variantesValoresRepositories.findById(id);

    if (!varianteVal)
      throw new AppError("Valor da Variante não encontrada");

    await variantesValoresRepositories.deleteById(id);

  }
}