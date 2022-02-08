import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateFormaPgtoBandTaxasDTO } from "../../dtos/ICreateFormaPgtoBandTaxasDTO";
import { FormaPgtoBandTaxasRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandTaxasRepositories";

@injectable()
export class CreateFormaPgtoBandTaxasUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateFormaPgtoBandTaxasDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_forma_pgto_band && data[0].id_forma_pgto_band.length <= 0)
      throw new AppError("Forma de pagamento não informado")

    const repositories = new FormaPgtoBandTaxasRepositories(cod_cliente);

    const valoresExists = await repositories.findByFormaPgtoBand(data[0].id_forma_pgto_band);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.nr_parcela === item.nr_parcela);

        if (!alreadyExists && item.id_forma_pgto_band && item.id_forma_pgto_band.length > 0)
          return item;
      }
      else
        return item;
    })

    await repositories.create(newData);
  }
}