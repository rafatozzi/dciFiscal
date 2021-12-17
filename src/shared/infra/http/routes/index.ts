import { Router } from "express";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ufRouter } from "./uf.routes";
import { cidadesRouter } from "./cidades.routes";
import { empresaRoutes } from "./empresa.routes";
import { variantesRoutes } from "./variantes.routes";
import { produtosRoutes } from "./produtos.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/uf", ufRouter);
router.use("/cidades", cidadesRouter);
router.use("/empresas", empresaRoutes);
router.use("/variantes", variantesRoutes);
router.use("/produtos", produtosRoutes);

router.use(authenticateRoutes);

export { router };