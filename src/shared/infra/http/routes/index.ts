import { Router } from "express";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ufRouter } from "./uf.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/uf", ufRouter);

router.use(authenticateRoutes);

export { router };