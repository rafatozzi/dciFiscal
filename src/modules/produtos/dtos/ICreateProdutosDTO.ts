export interface ICreateProdutosDTO {
  id?: string;
  nome: string;
  cod_barras: string;
  ncm: string;
  cfop: number;
  unid_med: string;
  preco: number;
  favorito: boolean;
}