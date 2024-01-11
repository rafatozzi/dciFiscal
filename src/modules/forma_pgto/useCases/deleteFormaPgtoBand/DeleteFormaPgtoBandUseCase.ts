import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { FormaPgtoBandRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandRepositories";
import { FormaPgtoBandTaxasRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandTaxasRepositories";

@injectable()
export class DeleteFormaPgtoBandUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new FormaPgtoBandRepositories(cod_cliente);
    const taxasRespositories = new FormaPgtoBandTaxasRepositories(cod_cliente);

    const bandeira = await repositories.findById(id);

    if (!bandeira)
      throw new AppError("Bandeira não encontrada");

    const taxas = await taxasRespositories.findByFormaPgtoBand(bandeira.id);

    taxas.map(async (itemTaxas) => {
      await taxasRespositories.deleteById(itemTaxas.id);
    });

    await repositories.deleteById(id);
  }
}