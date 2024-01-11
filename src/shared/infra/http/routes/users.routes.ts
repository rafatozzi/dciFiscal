import { Router } from "express"

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { ListUsersController } from "../../../../modules/accounts/useCases/listUsers/ListUsersController";
import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPassword/resetPasswordController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const listUsersController = new ListUsersController();
const resetPasswordController = new ResetPasswordController();

usersRouter.post("/", createUserController.handle);

usersRouter.get("/", EnsureAuthenticated, profileUserController.handle);

usersRouter.get("/list", EnsureAuthenticated, listUsersController.handle);

usersRouter.post("/resetPassword", EnsureAuthenticated, resetPasswordController.handle);

export { usersRouter };