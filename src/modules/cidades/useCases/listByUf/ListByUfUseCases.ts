import { injectable } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { CidadesRepositories } from "../../infra/typeorm/repositories/CidadesRepositories";

@injectable()
export class ListByUfUseCases {

  constructor(
    // @inject("CidadesRepositories")
    // private cidadesRepositories: ICidadesRespositories
  ) { }

  async execute(cod_cliente: string, uf: number): Promise<Cidades[]> {
    const cidadesRepositories = new CidadesRepositories(cod_cliente);
    const result = await cidadesRepositories.findByUf(uf);

    return result;
  }

}