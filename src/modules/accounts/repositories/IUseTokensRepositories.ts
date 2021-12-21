import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserToken } from "../infra/typeorm/entities/UserTokens";

export interface IUseTokensRepositories {
  create(data: ICreateUserTokensDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
  findByUserId(user_id: string): Promise<UserToken[]>;
  deleteById(id: string): Promise<void>;
}