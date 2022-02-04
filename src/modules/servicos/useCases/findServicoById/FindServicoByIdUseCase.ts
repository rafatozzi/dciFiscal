import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Servicos } from "../../infra/typeorm/entities/Servicos";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class FindServicoByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Servicos> {
    const repositories = new ServicosRepositories(cod_cliente);
    const servico = await repositories.findById(id);

    if (!servico)
      throw new AppError("Serviço não encontrado");

    return servico;
  }
}