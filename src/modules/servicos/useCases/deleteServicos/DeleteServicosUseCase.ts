import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ServicosCkeckListRepositories } from "../../infra/typeorm/repositories/ServicosCkeckListRepositories";
import { ServicosComissaoRepositories } from "../../infra/typeorm/repositories/ServicosComissaoRepositories";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class DeleteServicosUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new ServicosRepositories(cod_cliente);
    const checklistRepositories = new ServicosCkeckListRepositories(cod_cliente);
    const comissaoRepositories = new ServicosComissaoRepositories(cod_cliente);

    const servico = await repositories.findById(id);

    if (!servico)
      throw new AppError("Serviço não encontrado");

    const checkLists = await checklistRepositories.findByServico(servico.id);
    const comissoes = await comissaoRepositories.findByServico(servico.id);

    checkLists.map(async (item) => {
      await checklistRepositories.deleteById(item.id);
    })

    comissoes.map(async (item) => {
      await comissaoRepositories.deleteById(item.id);
    })

    await repositories.deleteServico(id);
  }
}