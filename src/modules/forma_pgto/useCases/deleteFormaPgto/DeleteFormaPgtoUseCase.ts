import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { FormaPgtoBandRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandRepositories";
import { FormaPgtoBandTaxasRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandTaxasRepositories";
import { FormaPgtoRepositories } from "../../infra/typeorm/repositories/FormaPgtoRepositories";

@injectable()
export class DeleteFormaPgtoUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new FormaPgtoRepositories(cod_cliente);
    const bandRepositories = new FormaPgtoBandRepositories(cod_cliente);
    const taxaRepositories = new FormaPgtoBandTaxasRepositories(cod_cliente);

    const formaPgto = await repositories.findById(id);

    if (!formaPgto)
      throw new AppError("Forma de pagamento não encontrado");

    const bandeiras = await bandRepositories.findByFormaPgto(formaPgto.id);

    bandeiras.map(async (item) => {
      const taxas = await taxaRepositories.findByFormaPgtoBand(item.id);

      taxas.map(async (itemTaxas) => {
        await taxaRepositories.deleteById(itemTaxas.id);
      });

      await bandRepositories.deleteById(item.id);
    });

    await repositories.deleteFormaPgto(id);
  }
}