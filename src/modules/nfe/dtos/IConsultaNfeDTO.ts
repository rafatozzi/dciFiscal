import { IEmpresaApiNfe } from "./IEmpresaApiNfe";
import { IInfoNfe } from "./IInfoNfe";

export interface IConsultaNfeDTO {
  senha_certificado: string;
  empresa: IEmpresaApiNfe;
  info_nfe: IInfoNfe;
  xml_assinado: string;
  recibo: string;
}