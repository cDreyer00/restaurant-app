import {Request, Response} from "express"
import { CompleteOrderService } from "../../services/order/CompleteOrderService"

export class CompleteOrderController{
   async handle(req: Request, res: Response){

      const order_id = req.query.order_id as string

      const order = await new CompleteOrderService().execute(order_id);

      return res.json(order);
   }
}