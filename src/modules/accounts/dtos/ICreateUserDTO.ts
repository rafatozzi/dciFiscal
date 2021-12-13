export interface ICreateUserDTO {
  nome: string;
  user: string;
  senha: string;
  admin?: boolean;
  id?: string;
}