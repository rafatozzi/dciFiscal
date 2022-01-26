import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { ICancelaNfeDTO } from "../../dtos/ICancelaNfeDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class CancelaNfeUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente, motivo }) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe) {
      console.log("NFe não encontrada");
      throw new Error("NFe não encontrada");
    }

    const empresa = await empresaRepositories.findById(nfe.id_empresa);

    if (!empresa)
      throw new Error("Empresa não encontrada"); const jsonRequest: ICancelaNfeDTO = {
        senha_certificado: empresa.senha_cert,
        empresa: {
          razao: empresa.razao,
          fantasia: empresa.fantasia,
          cnpj: empresa.cnpj,
          ie: empresa.ie,
          bairro: empresa.bairro,
          cep: empresa.cep,
          cidade: empresa.cidade.nome,
          cidade_ibge: empresa.cidade.ibge,
          complemento: empresa.complemento,
          crt: empresa.crt,
          endereco: empresa.endereco,
          fone: empresa.fone,
          nr: empresa.nr,
          uf: empresa.cidade.uf.uf,
          uf_ibge: empresa.cidade.uf.ibge
        },
        info_nfe: {
          ambiente: empresa.ambiente,
          data_hora: this.dayjsDateProvider.dateNow(),
          nr_nfe: nfe.nr_nfe,
          serie_nfe: empresa.serie_nfe
        },
        chave: nfe.chave,
        justificativa: motivo,
        nrProtocolo: nfe.protocolo
      }

    const formData = new FormData();

    const certFolder = resolve(__dirname, "..", "..", "..", "..", "..", "archives", "cert");
    const file = fs.createReadStream(`${certFolder}/${empresa.id}.pfx`);

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, { knownLength: fs.statSync(`${certFolder}/${empresa.id}.pfx`).size });
  }
}