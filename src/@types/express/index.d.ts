declare namespace Express {
  export interface Request {
    user: {
      id: string;
    },
    cod_cliente: string;
  }
}