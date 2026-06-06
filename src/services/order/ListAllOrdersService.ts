import prismaClient from "../../prisma";

interface ListOrdersRequest {
  userId: string;
  isAdmin?: boolean;
}

class ListAllOrdersService {
  async execute({ userId, isAdmin = false }: ListOrdersRequest) {
    const orders = await prismaClient.order.findMany({
      where: isAdmin ? {} : { userId },
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true
              }
            }
          }
        }
      }
    });

    return orders;
  }
}

export { ListAllOrdersService };