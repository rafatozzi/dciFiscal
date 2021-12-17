import { injectable, inject } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { ICidadesRespositories } from "../../repositories/ICidadesRespositories";

@injectable()
export class ListAllCidadesUseCases {

  constructor(
    @inject("CidadesRepositories")
    private cidadesRepositories: ICidadesRespositories
  ) { }

  async execute(): Promise<Cidades[]> {
    const result = await this.cidadesRepositories.findAll();

    return result;
  }

}