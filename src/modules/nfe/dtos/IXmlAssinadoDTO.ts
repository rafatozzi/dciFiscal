import { IClienteNfe } from "./IClienteNfe";
import { IEmpresaApiNfe } from "./IEmpresaApiNfe";
import { IInfoNfe } from "./IInfoNfe";
import { IPgtosApiNfe } from "./IPgtosApiNfe";
import { IProdutosApiNfe } from "./IProdutosApiNfe";

export interface IXmlAssinadoDTO {
  senha_certificado: string;
  chave: string;
  empresa: IEmpresaApiNfe;
  info_nfe: IInfoNfe;
  cliente: IClienteNfe;
  produtos: IProdutosApiNfe[];
  pgtos: IPgtosApiNfe[];
}