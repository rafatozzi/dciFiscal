import { injectable } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { CidadesRepositories } from "../../infra/typeorm/repositories/CidadesRepositories";

@injectable()
export class ListAllCidadesUseCases {

  constructor(
    // @inject("CidadesRepositories")
    // private cidadesRepositories: ICidadesRespositories
  ) { }

  async execute(cod_cliente: string): Promise<Cidades[]> {
    const cidadesRepositories = new CidadesRepositories(cod_cliente);
    const result = await cidadesRepositories.findAll();

    return result;
  }

}