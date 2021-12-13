import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepositories } from "../../../repositories/IUsersRepositories";
import { Users } from "../entities/Users";

export class UsersRepositories implements IUsersRepositories {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getRepository(Users);
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