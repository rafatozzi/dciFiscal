import { Router } from "express";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/users", usersRouter);
router.use(authenticateRoutes);

export { router };