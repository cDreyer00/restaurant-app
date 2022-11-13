import { json, Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { DetailUserController } from "../user/DetailUserController";

export class CreateOrderController {
   async handle(req: Request, res: Response) {

      const { table, name } = req.body;
      const newOrder = await new CreateOrderService().execute({ table, name })
      return res.json(newOrder);
   }
}