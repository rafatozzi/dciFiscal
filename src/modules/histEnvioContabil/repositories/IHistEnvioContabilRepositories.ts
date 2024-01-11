import { ICreateHistEnvioContabil } from "../dtos/ICreateHistEnvioContabil";
import { IFilterHistEnvioContabil } from "../dtos/IFilterHistEnvioContabil";
import { IListHistEnvioContabil } from "../dtos/IListHistEnvioContabil";
import { HistEnvioContabil } from "../infra/typeorm/entities/HistEnvioContabil";

export interface IHistEnvioContabilRepositories {
  create(data: ICreateHistEnvioContabil): Promise<HistEnvioContabil>;
  findAll(pesquisa?: IFilterHistEnvioContabil, limit?: number, cursor?: number): Promise<IListHistEnvioContabil>
  findById(id: string): Promise<HistEnvioContabil>;
}