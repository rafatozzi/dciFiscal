import { injectable } from "tsyringe";
import { IImportaXmlDTO } from "../../dtos/IImportaXmlDTO";
import { ClientesRepositories } from "../../../clientes/infra/typeorm/repositories/ClientesRepositories";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Xml2Json from "xml2json";
import fs from "fs";
import { IJsonXml } from "../../dtos/IJsonXml";
import { Clientes } from "../../../clientes/infra/typeorm/entities/Clientes";
import { CidadesRepositories } from "../../../cidades/infra/typeorm/repositories/CidadesRepositories";

@injectable()
export class JobImportaXmlUseCase {
  constructor() { }
  async execute({ cod_cliente, filePath }: IImportaXmlDTO) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const cidadesRepositories = new CidadesRepositories(cod_cliente);

    try {
      fs.readFile(filePath, async (err, data) => {
        const jsonXml = Xml2Json.toJson(data);

        const xml = JSON.parse(jsonXml) as IJsonXml;
        const infNFe = xml.nfeProc.NFe.infNFe;

        const empresa = empresasRepositories.findByCNPJ(xml.nfeProc.NFe.infNFe.emit.CNPJ);

        if (!empresa)
          throw new Error("Empresa não encontrada");

        const cpf_cnpj = infNFe.dest.CPF ? infNFe.dest.CPF : infNFe.dest.CNPJ;
        let cliente: Clientes = await clientesRepositories.findByCpfCnpj(cpf_cnpj);

        if (!cliente) {
          const cidade = await cidadesRepositories.findByIbge(infNFe.dest.enderDest.cMun);

          cliente = await clientesRepositories.create({
            razao_social: infNFe.dest.xNome,
            fantasia: infNFe.dest.xNome,
            cpf_cnpj: infNFe.dest.CPF ? infNFe.dest.CPF : infNFe.dest.CNPJ,
            id_cidades: cidade.id,
            bairro: infNFe.dest.enderDest.xBairro,
            celular: 0,
            cep: `${infNFe.dest.enderDest.CEP}`,
            complemento: "",
            email: "",
            endereco: infNFe.dest.enderDest.xLgr,
            favorito: false,
            numero: parseInt(infNFe.dest.enderDest.nro),
            rg_ie: infNFe.dest.IE ? infNFe.dest.IE : 0,
            telefone: infNFe.dest.enderDest.fone
          });
        }

      })
    } catch (err) {
      throw new Error(err);
    } finally {
      await fs.promises.unlink(filePath);
    }
  }
}