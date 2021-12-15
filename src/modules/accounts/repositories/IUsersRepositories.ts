import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/Users";
import { IListUsersResponseDTO } from "../dtos/IListUsersResponseDTO";

export interface IUsersRepositories {
  create(data: ICreateUserDTO): Promise<void>;
  findByUser(user: string): Promise<Users>;
  findById(id: string): Promise<Users>;
  findAll(limit?: number, cursor?: number): Promise<IListUsersResponseDTO>;
}