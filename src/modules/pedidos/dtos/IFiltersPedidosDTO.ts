export interface IFiltersPedidosDTO {
  empresa?: string;
  cliente?: string;
  date_ini?: Date;
  date_fin?: Date;
  pago?: "s" | "n" | "a";
}