import { Request, Response } from "express"
import { ListOrderService } from "../../services/order/ListOrderService"

export class ListOrderController {
   async handle(req: Request, res: Response) {

      const orders = await new ListOrderService().execute();
      return res.json(orders);
   }
}