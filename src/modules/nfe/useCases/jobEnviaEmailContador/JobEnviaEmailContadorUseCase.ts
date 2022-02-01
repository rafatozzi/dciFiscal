import { inject, injectable } from "tsyringe";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { IEnviaEmailContadorDTO } from "../../dtos/IEnviaEmailContadorDTO";


@injectable()
export class JobEnviaEmailContadorUseCase {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute({ cod_cliente, idEmpresa, mes, ano }: IEnviaEmailContadorDTO) {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);

    const empresa = await empresasRepositories.findById(idEmpresa);

    if (!empresa)
      throw new Error("Empresa não encontrada");


  }
}