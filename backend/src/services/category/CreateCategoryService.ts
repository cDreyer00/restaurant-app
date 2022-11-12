import prismaClient from "../../prisma";

class CreateCategoryService{
   async execute(){
      return { created: true }
   }
}

export { CreateCategoryService }