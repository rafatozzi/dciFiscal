import { injectable, inject } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { CidadesRepositories } from "../../infra/typeorm/repositories/CidadesRepositories";

@injectable()
export class ListAllCidadesUseCases {

  constructor(
    @inject("CidadesRepositories")
    private cidadesRepositories: CidadesRepositories
  ) { }

  async execute(): Promise<Cidades[]> {
    const result = await this.cidadesRepositories.findAll();

    return result;
  }

}