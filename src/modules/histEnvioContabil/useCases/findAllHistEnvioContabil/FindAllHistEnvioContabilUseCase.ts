import { response } from "express";
import { injectable } from "tsyringe";
import { IFilterHistEnvioContabil } from "../../dtos/IFilterHistEnvioContabil";
import { IListHistEnvioContabil } from "../../dtos/IListHistEnvioContabil";
import { HistEnvioContabilRepositories } from "../../infra/typeorm/repositories/HistEnvioContabilRepositories";

@injectable()
export class FindAllHistEnvioContabilUseCase {
  constructor() { }

  async execute(cod_cliente: string, pesquisa?: IFilterHistEnvioContabil, limit?: number, cursor?: number): Promise<IListHistEnvioContabil> {
    const histEnvioContabilRepositories = new HistEnvioContabilRepositories(cod_cliente);
    const result = await histEnvioContabilRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }
}