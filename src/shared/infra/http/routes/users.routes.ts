import { Router } from "express"

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { ListUsersController } from "../../../../modules/accounts/useCases/listUsers/ListUsersController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const listUsersController = new ListUsersController();

usersRouter.post("/", createUserController.handle);

usersRouter.get("/", EnsureAuthenticated, profileUserController.handle);

usersRouter.get("/list", EnsureAuthenticated, listUsersController.handle);

export { usersRouter };