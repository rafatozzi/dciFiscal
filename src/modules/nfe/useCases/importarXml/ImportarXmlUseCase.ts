import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ClientesRepositories } from "../../../clientes/infra/typeorm/repositories/ClientesRepositories";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { IMulterFiles } from "../../dtos/IMulterFiles";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Xml2Json from "xml2json";
import fs from "fs";

@injectable()
export class ImportarXmlUseCase {
  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute(cod_cliente: string, files: IMulterFiles[]): Promise<void> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const clientesRepositories = new ClientesRepositories(cod_cliente);

    files.map((xmlFile) => {
      if (xmlFile.mimetype === "application/xml") {
        fs.readFile(xmlFile.path, (err, data) => {
          const jsonXml = Xml2Json.toJson(data);

          console.log(jsonXml);

        })
        // const nfeJson = Xml2Json.toJson();
      }
    })
  }
}