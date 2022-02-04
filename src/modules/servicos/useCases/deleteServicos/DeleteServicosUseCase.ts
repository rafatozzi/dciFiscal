import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class DeleteServicosUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new ServicosRepositories(cod_cliente);
    const servico = await repositories.findById(id);

    if (!servico)
      throw new AppError("Serviço não encontrado");

    await repositories.deleteServico(id);
  }
}