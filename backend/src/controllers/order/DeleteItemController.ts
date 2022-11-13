import { Request, Response } from "express";
import { DeleteItemService } from "../../services/order/DeleteItemService";

export class DeleteItemController {
   async handle(req: Request, res: Response) {

      const { item_id } = req.body
      const item = await new DeleteItemService().execute(item_id)

      return res.json(item);
   }
}
