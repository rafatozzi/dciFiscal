import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateServicoDTO } from "../../dtos/ICreateServicoDTO";
import { Servicos } from "../../infra/typeorm/entities/Servicos";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class CreateServicosUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateServicoDTO): Promise<Servicos> {
    const repositories = new ServicosRepositories(cod_cliente);

    const exists = await repositories.findByNome(data.nome);

    if (exists)
      throw new AppError("Serviço já cadastrado");

    const servico = await repositories.create(data);

    return servico;
  }
}