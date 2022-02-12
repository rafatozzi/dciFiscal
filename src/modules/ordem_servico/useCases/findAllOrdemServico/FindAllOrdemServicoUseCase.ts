import { injectable } from "tsyringe";
import { IFilterOrdemServicoDTO } from "../../dtos/IFilterOrdemServicoDTO";
import { IListOrdemServicoDTO } from "../../dtos/IListOrdemServicoDTO";
import { OrdemServicoRepositories } from "../../infra/typeorm/repositories/OrdemServicoRepositories";

@injectable()
export class FindAllOrdemServicoUseCase {
  async execute(cod_cliente: string, pesquisa?: IFilterOrdemServicoDTO, limit?: number, cursor?: number): Promise<IListOrdemServicoDTO> {
    const repositories = new OrdemServicoRepositories(cod_cliente);

    const result = await repositories.findAll(pesquisa, limit, cursor);

    return result;
  }
}