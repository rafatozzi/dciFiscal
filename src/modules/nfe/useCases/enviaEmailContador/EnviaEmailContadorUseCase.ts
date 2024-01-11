import { injectable } from "tsyringe";
import Queue from "../../../../jobs/lib/queue";
import { IEnviaEmailContadorDTO } from "../../dtos/IEnviaEmailContadorDTO";

@injectable()
export class EnviaEmailContadorUseCase {

  constructor() { }

  async execute(cod_cliente: string, idEmpresa: string, mes: string, ano: number): Promise<void> {
    await Queue.add("EnviaEmailContador", {
      cod_cliente,
      idEmpresa,
      mes,
      ano
    } as IEnviaEmailContadorDTO);
  }

}