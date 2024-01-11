import { getRepository, Repository } from "typeorm";
import { ICreateUserTokensDTO } from "../../../dtos/ICreateUserTokensDTO";
import { IUseTokensRepositories } from "../../../repositories/IUseTokensRepositories";
import { UserToken } from "../entities/UserTokens";

export class UserTokensRepositories implements IUseTokensRepositories {
  private repository: Repository<UserToken>;

  constructor(connectionName: string) {
    this.repository = getRepository(UserToken, connectionName);
  }

  async findByUserId(user_id: string): Promise<UserToken[]> {
    return this.repository.find({ user_id });
  }

  async create(data: ICreateUserTokensDTO): Promise<UserToken> {
    const userToken = this.repository.create({ ...data });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.repository.findOne({ refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}