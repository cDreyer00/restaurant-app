import { Request, Response } from "express";
import { ListByCategoryService} from "../../services/product/ListByCategoryService";

export class ListByCategoryController{
   async handle(req: Request, res: Response) {
      const category_id = req.query.category_id as string;
      const products = await new ListByCategoryService().execute({category_id});
      return res.json(products);
   }
}