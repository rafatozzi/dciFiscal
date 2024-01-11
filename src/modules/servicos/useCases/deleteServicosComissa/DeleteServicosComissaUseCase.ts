import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ServicosComissaoRepositories } from "../../infra/typeorm/repositories/ServicosComissaoRepositories";

@injectable()
export class DeleteServicosComissaUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new ServicosComissaoRepositories(cod_cliente);
    const comissao = await repositories.findById(id);

    if (!comissao)
      throw new AppError("Comissão não encontrada");

    await repositories.deleteById(id);
  }
}