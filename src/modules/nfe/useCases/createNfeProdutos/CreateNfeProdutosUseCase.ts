import { injectable } from "tsyringe";
import { ICreateNfeProdutosDTO } from "../../dtos/ICreateNfeProdutosDTO";
import { NfeProdutosRepositories } from "../../infra/typeorm/repositories/NfeProdutosRepositories";

@injectable()
export class CreateNfeProdutosUseCase {

  constructor(
    // @inject("NfeProdutosRepositories")
    // private nfeProdutosRepositories: INfeProdutosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateNfeProdutosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    const newData = data.map((item) => {
      if (item.id_nfe && item.id_nfe.length > 0 && item.id_produto && item.id_produto.length > 0) {
        return item;
      }
    })

    const nfeProdutosRepositories = new NfeProdutosRepositories(cod_cliente);
    await nfeProdutosRepositories.create(newData);
  }

}