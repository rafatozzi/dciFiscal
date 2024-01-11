import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateFormaPgtoBandDTO } from "../../dtos/ICreateFormaPgtoBandDTO";
import { FormaPgtoBandRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandRepositories";

@injectable()
export class CreateFormaPgtoBandUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateFormaPgtoBandDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_forma_pgto && data[0].id_forma_pgto.length <= 0)
      throw new AppError("Forma de pagamento não informado")

    const repositories = new FormaPgtoBandRepositories(cod_cliente);

    const valoresExists = await repositories.findByFormaPgto(data[0].id_forma_pgto);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.nome === item.nome);

        if (!alreadyExists && item.id_forma_pgto && item.id_forma_pgto.length > 0)
          return item;
      }
      else
        return item;
    })

    await repositories.create(newData);
  }
}