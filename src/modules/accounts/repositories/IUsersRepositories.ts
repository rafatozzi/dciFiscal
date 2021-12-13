import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/Users";

export interface IUsersRepositories {
  create(data: ICreateUserDTO): Promise<void>;
  findByUser(user: string): Promise<Users>;
  findById(id: string): Promise<Users>;
}