import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateVariantesValoresDTO } from "../../dtos/ICreateVariantesValoresDTO";
import { VariantesValoresRepositories } from "../../infra/typeorm/repositories/VariantesValoresRepositories";

@injectable()
export class CreateVarianteValoresUseCase {

  constructor(
    // @inject("VariantesValoresRepositories")
    // private variantesValoresRepositories: IVariantesValoresRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateVariantesValoresDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_variante && data[0].id_variante.length <= 0)
      throw new AppError("Variante não informada")

    const variantesValoresRepositories = new VariantesValoresRepositories(cod_cliente);
    const valoresExists = await variantesValoresRepositories.findByVariante(data[0].id_variante);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.nome === item.nome)

        if (!alreadyExists && item.id_variante && item.id_variante.length > 0)
          return item;
      }
      else
        return item;
    })

    await variantesValoresRepositories.create(newData);

  }

}