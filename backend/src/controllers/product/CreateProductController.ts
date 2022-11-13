import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
   async handle(req: Request, res: Response) {
      
      const {name, price, description, category_id} = req.body;
      
      if(!req.file){
         throw new Error("error upload file")
      }

      const {filename: banner} = req.file
       
      const product = await new CreateProductService().execute({
         price,
         name,
         description,
         banner: banner,
         category_id,
      })

      return res.json(product);
   }
}