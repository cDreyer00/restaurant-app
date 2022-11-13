import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

export class DeleteOrderController{
   async handle(req: Request, res: Response){

      console.log("remove")
      const order_id = req.query.order_id as string;
      const remove = await new DeleteOrderService().execute(order_id);
      
      return res.json(remove);
   }
}