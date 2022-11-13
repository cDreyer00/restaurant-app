import prismaClient from "../../prisma";

export class DetailOrderService {
   async execute(order_id: string) {

      const items = await prismaClient.item.findMany({
         where: {
            order_id: order_id
         },
         include: {
            product: true,
            order: true
         }
      })

      return items;
   }
}