import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthentticated as IsAuthenticated } from "./middlewares/IsAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer"

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS USER --
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/userinfo", IsAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORIAS --
router.post("/category", IsAuthenticated, new CreateCategoryController().handle)
router.get("/category", IsAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUTOS --
router.post("/product", IsAuthenticated, upload.single("banner"), new CreateProductController().handle)

export { router };