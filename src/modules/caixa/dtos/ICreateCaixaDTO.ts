export interface ICreateCaixaDTO {
  id?: string;
  valor_inicial: number;
  dinheiro?: number;
  cartao_credito?: number;
  cartao_debito?: number;
  fechado?: boolean;
}