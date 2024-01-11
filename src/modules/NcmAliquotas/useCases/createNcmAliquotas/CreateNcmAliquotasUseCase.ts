import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateNcmAliquotaDTO } from "../../dtos/ICreateNcmAliquotaDTO";
import { NcmAliquotas } from "../../infra/typeorm/entities/NcmAliquotas";
import { NcmAliquotasRepositories } from "../../infra/typeorm/repositories/NcmAliquotasRepositories";

@injectable()
export class CreateNcmAliquotasUseCase {

  constructor() { }

  async execute(cod_cliente: string, data: ICreateNcmAliquotaDTO): Promise<NcmAliquotas> {
    const aliquotaRepositories = new NcmAliquotasRepositories(cod_cliente);

    if (!data.ncm)
      throw new AppError("NCM não informado");

    if (!data.id) {
      const alreadyExists = await aliquotaRepositories.findByNcm(data.ncm);

      if (alreadyExists)
        data.id = alreadyExists.id;
    }

    const aliquota = await aliquotaRepositories.create(data);

    return aliquota;
  }

}