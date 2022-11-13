import prismaClient from "../../prisma";

export interface ProductRequest{
   category_id: string
}

export class ListByCategoryService{
   async execute({ category_id }: ProductRequest) {
      const products = prismaClient.product.findMany({
         where:{
            category_id: category_id
         },
      })
      return products
   }
}