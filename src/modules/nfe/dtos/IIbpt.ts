// export interface IIbpt {
//   Codigo: string | null;
//   UF: string | null;
//   EX: number;
//   Descricao: string | null;
//   Nacional: number;
//   Estadual: number;
//   Importado: number;
//   Municipal: number;
//   Tipo: string;
//   VigenciaInicio: string | null;
//   VigenciaFim: string | null;
//   Chave: string | null;
//   Versao: string | null;
//   Fonte: string | null;
//   Valor: number;
//   ValorTributoNacional: number;
//   ValorTributoEstadual: number;
//   ValorTributoImportado: number;
//   ValorTributoMunicipal: number;
// }

export interface IIbpt {
  fiscalType: string;
  state: string;
  source: string;
  version: string;
  code: string;
  effectiveDate: string;
  federalNationalRate: number;
  federalImportedRate: number;
  stateRate: number;
  municipalRate: number;
}