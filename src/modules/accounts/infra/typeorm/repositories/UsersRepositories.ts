import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepositories } from "../../../repositories/IUsersRepositories";
import { Users } from "../entities/Users";
import { IListUsersResponseDTO } from "../../../dtos/IListUsersResponseDTO";
import { UserMap } from "../../../mapper/UserMap";

export class UsersRepositories implements IUsersRepositories {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getRepository(Users);
  }

  async findAll(limit?: number, cursor?: number): Promise<IListUsersResponseDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    const [result, total] = await this.repository.findAndCount(
      {
        order: { nome: "ASC" },
        take: limitPage,
        skip: cursorPage
      }
    )

    const list = result.map((rs) => {
      return UserMap.toDTO(rs);
    })

    return {
      result: list,
      total
    };
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ ...data });

    await this.repository.save(user);
  }

  async findByUser(user: string): Promise<Users> {
    const result = await this.repository.findOne({ user })

    return result;
  }

  async findById(id: string): Promise<Users> {
    const result = await this.repository.findOne(id);

    return result;
  }

}