import { injectable } from "tsyringe";
import { Variantes } from "../../infra/typeorm/entities/Variantes";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class FindByIdVarianteUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Variantes> {
    const variantesRepositories = new VariantesRepositories(cod_cliente);
    const result = await variantesRepositories.findById(id);

    return result;
  }

}