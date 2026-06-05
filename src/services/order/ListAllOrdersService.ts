import prismaClient from "../../prisma";

class ListAllOrdersService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return orders;
  }
}

export { ListAllOrdersService };