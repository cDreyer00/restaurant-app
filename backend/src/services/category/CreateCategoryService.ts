import { prisma } from "@prisma/client";
import prismaClient from "../../prisma";

interface CategoryRequest {
   name: string;

}

class CreateCategoryService {
   async execute({ name }: CategoryRequest) {

      const categories = await prismaClient.category.findMany()

      if (name == "") {
         throw new Error("invalid name")
      }
      categories.map((item) => {
         if (item.name == name) {
            throw new Error("Category already exists");
         }
      })
      
      const category = await prismaClient.category.create({
         data: {
            name: name,
         },
         select: {
            id: true,
            name: true,
         }
      })
      
      console.log(categories.map((item) => item.name));
      return { category }
   }
}

export { CreateCategoryService }