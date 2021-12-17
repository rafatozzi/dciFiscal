import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { existsSync } from "fs";
import { resolve } from "path";
import upload from "../../../../config/upload";

@injectable()
export class UploadCertificadoUseCase {

  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute(empresa_id: string, file: string): Promise<void> {
    const fileName = `${empresa_id}.pfx`;
    const oldFile = existsSync(resolve(`${upload.tmpFolder}/cert`, fileName));

    if (oldFile)
      await this.storageProvider.delete(fileName, "cert");

    await this.storageProvider.save(file, "cert", fileName);
  }

}