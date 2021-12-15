import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO"
import { Users } from "../infra/typeorm/entities/Users";

export class UserMap {
  static toDTO({ nome, id, admin, user }: Users): IUserResponseDTO {
    const result = instanceToInstance({
      id,
      user,
      nome,
      admin
    });

    return result;
  }
}