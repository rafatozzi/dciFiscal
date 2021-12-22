import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/authenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/login", authenticateUserController.handle);

authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

authenticateRoutes.post("/verify-token", EnsureAuthenticated, (request: Request, response: Response) => { return response.status(200).send() });

export { authenticateRoutes };