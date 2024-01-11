import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateServicoComissaoDTO } from "../../dtos/ICreateServicoComissaoDTO";
import { ServicosComissaoRepositories } from "../../infra/typeorm/repositories/ServicosComissaoRepositories";

injectable()
export class CreateServicosComissaoUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateServicoComissaoDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_servico && data[0].id_servico.length <= 0)
      throw new AppError("Serviço não informado")

    const repositories = new ServicosComissaoRepositories(cod_cliente);

    const valoresExists = await repositories.findByServico(data[0].id_servico);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.id_user === item.id_user);

        if (!alreadyExists && item.id_servico && item.id_servico.length > 0)
          return item;
      }
      else
        return item;
    })

    await repositories.create(newData);

  }
}