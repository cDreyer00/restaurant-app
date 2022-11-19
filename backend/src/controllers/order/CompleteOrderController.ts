import {Request, Response} from "express"
import { CompleteOrderService } from "../../services/order/CompleteOrderService"

export class CompleteOrderController{
   async handle(req: Request, res: Response){

      const {order_id} = req.body
      const order = await new CompleteOrderService().execute(order_id as string);

      return res.json(order);
   }
}