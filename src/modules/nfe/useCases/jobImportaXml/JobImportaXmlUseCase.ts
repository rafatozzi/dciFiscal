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
import { NfeProdutosRepositories } from "../../infra/typeorm/repositories/NfeProdutosRepositories";
import { ICreateNfeProdutosDTO } from "../../dtos/ICreateNfeProdutosDTO";
import { ProdutosRepositories } from "../../../produtos/infra/typeorm/repositories/ProdutosRepositories";
import { NfePgtosRepositories } from "../../infra/typeorm/repositories/NfePgtosRepositories";
import { ICreateNfePgtosDTO } from "../../dtos/ICreateNfePgtosDTO";
import { NfeXmlRepositories } from "../../infra/typeorm/repositories/NfeXmlRepositories";

@injectable()
export class JobImportaXmlUseCase {
  constructor() { }
  async execute({ cod_cliente, filePath }: IImportaXmlDTO) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfeProdutosRepositories = new NfeProdutosRepositories(cod_cliente);
    const nfePgtosRepositories = new NfePgtosRepositories(cod_cliente);
    const nfeXmlRepositories = new NfeXmlRepositories(cod_cliente);
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const cidadesRepositories = new CidadesRepositories(cod_cliente);
    const produtosRepositories = new ProdutosRepositories(cod_cliente);

    fs.readFile(filePath, async (err, data) => {
      if (err)
        throw new Error("Erro ao carregar arquivo");

      const jsonXml = Xml2Json.toJson(data);

      const xml = JSON.parse(jsonXml) as IJsonXml;
      const infNFe = xml.nfeProc.NFe.infNFe;

      const empresa = await empresasRepositories.findByCNPJ(xml.nfeProc.NFe.infNFe.emit.CNPJ);
      const checkNfe = await nfeRepositories.findByChave(infNFe.Id.replace(/[^0-9]/g, ''));

      if (!empresa)
        throw new Error("Empresa não encontrada");

      if (checkNfe)
        throw new Error("NFe já cadastrada");

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

      let situacao = "";

      switch (`${xml.nfeProc.protNFe.infProt.cStat}`) {
        case "100":
          situacao = "AUTORIZADA";
          break;
        case "101":
        case "135":
        case "155":
          situacao = "CANCELADA"
          break;
        default:
          situacao = "VERIFICAR";
          break;
      }

      const nfe = await nfeRepositories.create({
        id_cliente: cliente.id,
        id_empresa: empresa.id,
        chave: infNFe.Id.replace(/[^0-9]/g, ''),
        desconto: 0,
        total: infNFe.total.ICMSTot.vNF,
        nr_nfe: infNFe.ide.nNF,
        protocolo: xml.nfeProc.protNFe.infProt.nProt,
        situacao,
        status: xml.nfeProc.protNFe.infProt.cStat,
        recibo: ""
      });

      await nfeXmlRepositories.create({
        id_nfe: nfe.id,
        acao: "xml",
        xml: data.toString()
      });

      const produtos: ICreateNfeProdutosDTO[] = [];
      if (Array.isArray(infNFe.det)) {
        infNFe.det.map(async (item) => {
          let produto = await produtosRepositories.findByNome(item.prod.xProd);
          if (!produto) {
            produto = await produtosRepositories.create({
              nome: item.prod.xProd,
              cod_barras: item.prod.cEAN !== "SEM GTIN" ? item.prod.cEAN : "",
              ncm: item.prod.NCM,
              cfop: item.prod.CFOP,
              unid_med: item.prod.uCom,
              preco: item.prod.vUnCom,
              favorito: false,
            });
          }

          produtos.push({
            id_nfe: nfe.id,
            id_produto: produto.id,
            qtd: item.prod.qCom,
            valor_unit: item.prod.vUnCom
          });
        });
      } else {
        let produto = await produtosRepositories.findByNome(infNFe.det.prod.xProd);
        if (!produto) {
          produto = await produtosRepositories.create({
            nome: infNFe.det.prod.xProd,
            cod_barras: infNFe.det.prod.cEAN !== "SEM GTIN" ? infNFe.det.prod.cEAN : "",
            ncm: infNFe.det.prod.NCM,
            cfop: infNFe.det.prod.CFOP,
            unid_med: infNFe.det.prod.uCom,
            preco: infNFe.det.prod.vUnCom,
            favorito: false,
          });
        }

        produtos.push({
          id_nfe: nfe.id,
          id_produto: produto.id,
          qtd: infNFe.det.prod.qCom,
          valor_unit: infNFe.det.prod.vUnCom
        });
      }

      await nfeProdutosRepositories.create(produtos);

      const pgtos: ICreateNfePgtosDTO[] = [];

      if (Array.isArray(infNFe.pag.detPag)) {
        infNFe.pag.detPag.map((item) => {
          pgtos.push({
            id_nfe: nfe.id,
            forma_pgto: parseInt(item.tPag),
            valor: item.vPag
          });
        });
      } else {
        pgtos.push({
          id_nfe: nfe.id,
          forma_pgto: parseInt(infNFe.pag.detPag.tPag),
          valor: infNFe.pag.detPag.vPag
        });
      }
      await nfePgtosRepositories.create(pgtos);

      await fs.promises.unlink(filePath);
    })
  }
}