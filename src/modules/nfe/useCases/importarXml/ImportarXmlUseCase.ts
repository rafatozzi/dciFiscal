import { injectable } from "tsyringe";
import { IMulterFiles } from "../../dtos/IMulterFiles";
import { IImportaXmlDTO } from "../../dtos/IImportaXmlDTO";
import fs from "fs";
import Queue from "../../../../jobs/lib/queue";

@injectable()
export class ImportarXmlUseCase {
  constructor() { }

  async execute(cod_cliente: string, files: IMulterFiles[]): Promise<void> {

    files.map(async (xmlFile) => {
      console.log(xmlFile.mimetype);

      if (xmlFile.mimetype === "text/xml") {
        await Queue.add("ImportaXml", {
          cod_cliente,
          filePath: xmlFile.path
        } as IImportaXmlDTO);
      } else {
        await fs.promises.unlink(xmlFile.path);
      }
    })
  }
}