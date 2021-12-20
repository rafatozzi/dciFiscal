import { inject, injectable } from "tsyringe";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";
import { UserTokensRepositories } from "../../infra/typeorm/repositories/UserTokensRepositories";

interface IRequest {
  user: string;
  senha: string;
}

interface IResponse {
  user: {
    nome: string;
    user: string;
  },
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {

  constructor(
    // @inject("UsersRepositories")
    // private usersRepositories: IUsersRepositories,
    // @inject("UserTokensRepositories")
    // private userTokensRepositories: IUseTokensRepositories,
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(cod_cliente: string, { user, senha }: IRequest): Promise<IResponse> {
    const usersRepositories = new UsersRepositories(cod_cliente);
    const userTokensRepositories = new UserTokensRepositories(cod_cliente);

    const rsUser = await usersRepositories.findByUser(user);

    if (!rsUser)
      throw new AppError("Usuário não encontrado");

    const senhaMatch = await compare(senha, rsUser.senha);

    if (!senhaMatch)
      throw new AppError("Senha incorreta");

    const token = sign({}, auth.secret, {
      subject: rsUser.id,
      expiresIn: auth.expires_in_token
    });

    const refresh_token = sign({ user }, auth.secret_refresh_token, {
      subject: rsUser.id,
      expiresIn: auth.expires_in_refresh_token
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days);

    await userTokensRepositories.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: rsUser.id
    });

    return {
      user: {
        nome: rsUser.nome,
        user: rsUser.user
      },
      token,
      refresh_token
    };

  }

}