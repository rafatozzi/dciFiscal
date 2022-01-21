export interface IIbpt {
  Codigo: string | null;
  UF: string | null;
  EX: number;
  Descricao: string | null;
  Nacional: number;
  Estadual: number;
  Importado: number;
  Municipal: number;
  Tipo: string;
  VigenciaInicio: string | null;
  VigenciaFim: string | null;
  Chave: string | null;
  Versao: string | null;
  Fonte: string | null;
  Valor: number;
  ValorTributoNacional: number;
  ValorTributoEstadual: number;
  ValorTributoImportado: number;
  ValorTributoMunicipal: number;
}