import { injectable } from "tsyringe";
import { ICreateNfePgtosDTO } from "../../dtos/ICreateNfePgtosDTO";
import { NfePgtosRepositories } from "../../infra/typeorm/repositories/NfePgtosRepositories";

@injectable()
export class CreateNfePgtosUseCase {
  constructor(
    // @inject("NfesPgtosRepositories")
    // private nfePgtosRepositories: INfePgtosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateNfePgtosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const newData = data.map((item) => {
      if (
        item.id_nfe && item.id_nfe.length > 0
        && item.forma_pgto && item.forma_pgto > 0
        && item.valor && item.valor > 0) {
        return item;
      }
    })

    const nfePgtosRepositories = new NfePgtosRepositories(cod_cliente);
    await nfePgtosRepositories.create(newData);
  }

}