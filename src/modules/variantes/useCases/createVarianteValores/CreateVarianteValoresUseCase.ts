import { inject, injectable } from "tsyringe";
import { ICreateVariantesValoresDTO } from "../../dtos/ICreateVariantesValoresDTO";
import { VariantesValoresRepositories } from "../../infra/typeorm/repositories/VariantesValoresRepositories";

@injectable()
export class CreateVarianteValoresUseCase {

  constructor(
    @inject("VariantesValoresRepositories")
    private variantesValoresRepositories: VariantesValoresRepositories
  ) { }

  async execute(data: ICreateVariantesValoresDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const valoresExists = await this.variantesValoresRepositories.findByVariante(data[0].id_variante);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.nome === item.nome)

        if (!alreadyExists)
          return item;
      }
      else
        return item;
    })

    await this.variantesValoresRepositories.create(newData);

  }

}