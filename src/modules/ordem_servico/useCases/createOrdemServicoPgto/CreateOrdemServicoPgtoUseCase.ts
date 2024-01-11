import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoPgtosDTO } from "../../dtos/ICreateOrdemServicoPgtosDTO";
import { OrdemServicoPgtos } from "../../infra/typeorm/entities/OrdemServicoPgtos";
import { OrdemServicoPgtosRepositories } from "../../infra/typeorm/repositories/OrdemServicoPgtosRepositories";

@injectable()
export class CreateOrdemServicoPgtoUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoPgtosDTO): Promise<OrdemServicoPgtos> {
    if (!data.id_ordem_servico && data.id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoPgtosRepositories(cod_cliente);

    const pgto = await repositories.create(data);

    return pgto;
  }
}