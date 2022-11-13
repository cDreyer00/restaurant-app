import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

export class DetailOrderController {
   async handle(req: Request, res: Response) {

      const { order_id } = req.query;
      const order_items = await new DetailOrderService().execute(order_id as string);

      return res.json(order_items);
   }
}