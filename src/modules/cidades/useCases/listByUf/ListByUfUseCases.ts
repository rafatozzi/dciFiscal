import { inject, injectable } from "tsyringe";
import { Cidades } from "../../infra/typeorm/entities/Cidades";
import { CidadesRepositories } from "../../infra/typeorm/repositories/CidadesRepositories";

@injectable()
export class ListByUfUseCases {

  constructor(
    @inject("CidadesRepositories")
    private cidadesRepositories: CidadesRepositories
  ) { }

  async execute(uf: number): Promise<Cidades[]> {
    const result = await this.cidadesRepositories.findByUf(uf);

    return result;
  }

}