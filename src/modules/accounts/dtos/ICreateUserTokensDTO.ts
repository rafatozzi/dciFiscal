export interface ICreateUserTokensDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
  id?: string;
}