import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { NcmAliquotas } from "../../infra/typeorm/entities/NcmAliquotas";
import { NcmAliquotasRepositories } from "../../infra/typeorm/repositories/NcmAliquotasRepositories";

@injectable()
export class FindNcmAliquotaByNcmUseCase {
  constructor() { }

  async execute(cod_cliente: string, ncm: string): Promise<NcmAliquotas> {
    const aliquotaRepositories = new NcmAliquotasRepositories(cod_cliente);

    if (!ncm || ncm.length <= 3)
      throw new AppError("NCM não informado");

    const aliquota = await aliquotaRepositories.findByNcm(ncm);

    if (!aliquota)
      throw new AppError("Aliquota não encontrada");

    return aliquota;
  }
}