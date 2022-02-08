import { injectable } from "tsyringe";
import { IListFormaPgtosDTO } from "../../dtos/IListFormaPgtosDTO";
import { FormaPgtoRepositories } from "../../infra/typeorm/repositories/FormaPgtoRepositories";

@injectable()
export class FindAllFormaPgtoUseCase {
  constructor() { }

  async execute(cod_cliente: string, pesquisa: string = ""): Promise<IListFormaPgtosDTO> {
    const repositories = new FormaPgtoRepositories(cod_cliente);
    const result = await repositories.findAll(pesquisa)

    return result;
  }
}