import { injectable } from "tsyringe";
import { IListResponse } from "../../dtos/IListResponse";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class ListEmpresasUseCase {

  constructor(
    // @inject("EmpresasRepositories")
    // private empresasRepositories: IEmpresasRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: string, limit?: number, cursor?: number): Promise<IListResponse> {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);

    const result = await empresasRepositories.findAll(pesquisa, limit, cursor);
    return result;
  }

}