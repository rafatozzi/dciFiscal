import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateVarianteDTO } from "../../dtos/ICreateVarianteDTO";
import { Variantes } from "../../infra/typeorm/entities/Variantes";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class CreateVarianteUseCase {

  constructor(
    // @inject("VariantesRepositories")
    // private variantesRepositories: IVariantesRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateVarianteDTO): Promise<Variantes> {
    const variantesRepositories = new VariantesRepositories(cod_cliente);

    if (!data.id) {
      const alreadyExists = await variantesRepositories.findByNome(data.nome);

      if (alreadyExists)
        throw new AppError("Variante já cadastrada");
    }

    const variante = await variantesRepositories.create(data);

    return variante;
  }

}