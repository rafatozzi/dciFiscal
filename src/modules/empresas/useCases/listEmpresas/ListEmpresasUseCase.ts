import { inject, injectable } from "tsyringe";
import { IListResponse } from "../../dtos/IListResponse";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class ListEmpresasUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: EmpresasRepositories
  ) { }

  async execute(pesquisa?: string, limit?: number, cursor?: number): Promise<IListResponse> {
    const result = await this.empresasRepositories.findAll(pesquisa, limit, cursor);
    return result;
  }

}