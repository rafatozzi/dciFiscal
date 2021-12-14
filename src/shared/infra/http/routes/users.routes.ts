import { Router } from "express"

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();

usersRouter.post("/", createUserController.handle);

usersRouter.get("/", EnsureAuthenticated, profileUserController.handle);

export { usersRouter };