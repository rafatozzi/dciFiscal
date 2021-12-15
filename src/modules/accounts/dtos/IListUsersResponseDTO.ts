import { IUserResponseDTO } from "./IUserResponseDTO";


export interface IListUsersResponseDTO {
  total: number;
  result: IUserResponseDTO[];
}