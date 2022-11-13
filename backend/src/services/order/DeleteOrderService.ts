import { json } from "express";
import prismaClient from "../../prisma";

export class DeleteOrderService{
   async execute(order_id: string){
      const table = await prismaClient.order.delete({
         where:{
            id: order_id,
         }
      })

      return {ok: true};
   }
}