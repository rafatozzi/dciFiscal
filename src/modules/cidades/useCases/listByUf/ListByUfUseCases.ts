import { inject, injectable } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { ICidadesRespositories } from "../../repositories/ICidadesRespositories";

@injectable()
export class ListByUfUseCases {

  constructor(
    @inject("CidadesRepositories")
    private cidadesRepositories: ICidadesRespositories
  ) { }

  async execute(uf: number): Promise<Cidades[]> {
    const result = await this.cidadesRepositories.findByUf(uf);

    return result;
  }

}