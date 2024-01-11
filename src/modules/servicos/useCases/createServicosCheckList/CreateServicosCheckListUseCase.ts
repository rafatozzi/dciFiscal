import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateServicoCkeckListDTO } from "../../dtos/ICreateServicoCkeckListDTO";
import { ServicosCkeckListRepositories } from "../../infra/typeorm/repositories/ServicosCkeckListRepositories";

@injectable()
export class CreateServicosCheckListUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateServicoCkeckListDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_servico && data[0].id_servico.length <= 0)
      throw new AppError("Serviço não informado")

    const repositories = new ServicosCkeckListRepositories(cod_cliente);

    const valoresExists = await repositories.findByServico(data[0].id_servico);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.nome === item.nome);

        if (!alreadyExists && item.id_servico && item.id_servico.length > 0)
          return item;
      }
      else
        return item;
    })

    await repositories.create(newData);

  }
}