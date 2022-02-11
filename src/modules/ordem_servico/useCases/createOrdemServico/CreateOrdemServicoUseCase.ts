import { injectable } from "tsyringe";
import { ICreateOrdemServicoDTO } from "../../dtos/ICreateOrdemServicoDTO";
import { OrdemServico } from "../../infra/typeorm/entities/OrdemServico";
import { OrdemServicoRepositories } from "../../infra/typeorm/repositories/OrdemServicoRepositories";

@injectable()
export class CreateOrdemServicoUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoDTO): Promise<OrdemServico> {
    const repositories = new OrdemServicoRepositories(cod_cliente);

    const ordemServico = await repositories.create(data);

    return ordemServico;
  }
}