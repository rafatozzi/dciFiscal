import { injectable } from "tsyringe";


@injectable()
export class EnviaEmailContadorUseCase {

  constructor() { }

  async execute(cod_cliente: string, idEmpresa: string, mes: string, ano: number): Promise<void> {

  }

}