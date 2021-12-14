import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { UserTokensRepositories } from "../../infra/typeorm/repositories/UserTokensRepositories";
import { AppError } from "../../../../shared/errors/AppError";

interface IPayload {
  sub: string;
  user: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject("UserTokensRepositories")
    private userTokensRepositories: UserTokensRepositories,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<ITokenResponse> {

    const { sub: user_id, user } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken = await this.userTokensRepositories.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken)
      throw new AppError("Refresh Token não encontrado");

    await this.userTokensRepositories.deleteById(userToken.id);

    const refresh_token = sign({ user }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    });

    const refres_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days);

    await this.userTokensRepositories.create({
      user_id,
      refresh_token,
      expires_date: refres_token_expires_date
    });

    const newToken = sign({}, auth.secret, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    });

    return {
      token: newToken,
      refreshToken: refresh_token
    };
  }

}