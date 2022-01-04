import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { existsSync } from "fs";
import { resolve } from "path";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";
import upload from "../../../../config/upload";

@injectable()
export class UploadCertificadoUseCase {

  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute(cod_cliente: string, empresa_id: string, file: string, venc_cert: Date): Promise<void> {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const fileName = `${empresa_id}.pfx`;
    const oldFile = existsSync(resolve(`${upload.tmpFolder}/cert`, fileName));

    if (oldFile)
      await this.storageProvider.delete(fileName, "cert");

    await this.storageProvider.save(file, "cert", fileName);

    const empresa = await empresasRepositories.findById(empresa_id);

    await empresasRepositories.create({ ...empresa, venc_cert });

  }

}