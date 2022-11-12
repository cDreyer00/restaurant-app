import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController{
   async handle(req: Request, res: Response){
      const categoryService = await new CreateCategoryService().execute();

      return res.json(categoryService);
   }
}