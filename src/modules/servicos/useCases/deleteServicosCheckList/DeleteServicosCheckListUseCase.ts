import { injectable } from "tsyringe";

@injectable()
export class DeleteServicosCheckListUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {

  }
}