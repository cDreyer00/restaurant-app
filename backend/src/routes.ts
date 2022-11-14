import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthentticated as IsAuthenticated } from "./middlewares/IsAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { CompleteOrderController } from "./controllers/order/CompleteOrderController";

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
router.get("/category/product", IsAuthenticated, new ListByCategoryController().handle)

// -- ROTAS PEDIDOS --
router.post("/order", IsAuthenticated, new CreateOrderController().handle)
router.delete("/order", IsAuthenticated, new DeleteOrderController().handle)
router.post("/order/add", IsAuthenticated, new AddItemController().handle)
router.delete("/order/delete", IsAuthenticated, new DeleteItemController().handle)
router.put("/order/send", IsAuthenticated, new SendOrderController().handle)
router.get("/orders", IsAuthenticated, new ListOrderController().handle)
router.get("/order/detail", IsAuthenticated, new DetailOrderController().handle)
router.put("/order/complete", IsAuthenticated, new CompleteOrderController().handle)

export { router };