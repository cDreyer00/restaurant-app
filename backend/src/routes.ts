import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthentticated as IsAuthenticated } from "./middlewares/IsAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

// -- ROTAS USER --
router.post("/users", new CreateUserController().handle) // criar 
router.post("/session", new AuthUserController().handle)

router.get("/userinfo", IsAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORIAS --
router.post("/category", IsAuthenticated, new CreateCategoryController().handle)
router.get("/category", IsAuthenticated, new ListCategoryController().handle)

export { router };