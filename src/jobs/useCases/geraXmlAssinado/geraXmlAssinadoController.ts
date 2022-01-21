import axios from "axios";
import { EmpresasRepositories } from "../../../modules/empresas/infra/typeorm/repositories/EmpresasRepositories";
import { NfeRepositories } from "../../../modules/nfe/infra/typeorm/repositories/NfeRepositories";
import { DaysJsDateProvider } from "../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IClienteNfe } from "../../dtos/IClienteNfe";
import { IEmpresaApiNfe } from "../../dtos/IEmpresaApiNfe";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IInfoNfe } from "../../dtos/IInfoNfe";
import { IJobsProps } from "../../dtos/IJobsProps";
import { IProdutosApiNfe } from "../../dtos/IProdutosApiNfe";
import { IXmlAssinadoDTO } from "../../dtos/IXmlAssinadoDTO";

const job: IJobsProps = {
  key: "GeraXmlAssinado",
  handle: async ({ idNfe, cod_cliente }: IGeraXmlAssinado) => {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe)
      throw new Error("NFe não encontrada");

    const empresa = await empresaRepositories.findById(nfe.id);

    const dayJs = new DaysJsDateProvider();
    const nrNFe = empresa.nr_nfe + 1;

    const produtos: IProdutosApiNfe[] = [];

    nfe.pedidos.map((item) => {
      //
    })

    const jsonRequest: IXmlAssinadoDTO = {
      senha_certificado: empresa.senha_cert,
      chave: nfe.chave,
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
        data_hora: dayJs.dateNow(),
        nr_nfe: nrNFe,
        serie_nfe: empresa.serie_nfe
      },
      cliente: {
        bairro: nfe.cliente.bairro,
        cep: parseInt(nfe.cliente.cep.replace(/[^0-9]/g, "")),
        cidade: nfe.cliente.cidade.nome,
        cidade_ibge: nfe.cliente.cidade.ibge,
        complemento: nfe.cliente.complemento,
        cpf_cnpj: nfe.cliente.cpf_cnpj,
        endereco: nfe.cliente.endereco,
        ie: nfe.cliente.rg_ie,
        nome: nfe.cliente.razao_social,
        nr: nfe.cliente.numero,
        telefone: nfe.cliente.telefone,
        uf: nfe.cliente.cidade.uf.uf
      },
      produtos
    }

    await empresaRepositories.create({ ...empresa, nr_nfe: nrNFe });

    await axios.post(``);

  }
}

export default job;