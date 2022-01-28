import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { IMulterFiles } from "../../dtos/IMulterFiles";
import { IImportaXmlDTO } from "../../dtos/IImportaXmlDTO";
import fs from "fs";
import Queue from "../../../../jobs/lib/queue";

@injectable()
export class ImportarXmlUseCase {
  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute(cod_cliente: string, files: IMulterFiles[]): Promise<void> {

    files.map(async (xmlFile) => {
      if (xmlFile.mimetype === "application/xml") {
        await Queue.add("ImportaXml", {
          xml: "",
          cod_cliente,
          filePath: xmlFile.path
        } as IImportaXmlDTO);
      } else {
        await fs.promises.unlink(xmlFile.path);
      }
    })
  }
}