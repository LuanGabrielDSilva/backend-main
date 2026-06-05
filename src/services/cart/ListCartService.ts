import prismaClient from "../../prisma";

class ListCartService {
  async execute(userId: string) {

    const cart = await prismaClient.cart.findFirst({
      where: {
        userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return cart;
  }
}

export { ListCartService };