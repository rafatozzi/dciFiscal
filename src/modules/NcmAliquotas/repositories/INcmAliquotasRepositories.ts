import { ICreateNcmAliquotaDTO } from "../dtos/ICreateNcmAliquotaDTO";
import { NcmAliquotas } from "../infra/typeorm/entities/NcmAliquotas";

export interface INcmAliquotasRepositories {
  findByNcm(ncm: string): Promise<NcmAliquotas>;
  create(data: ICreateNcmAliquotaDTO): Promise<NcmAliquotas>;
}