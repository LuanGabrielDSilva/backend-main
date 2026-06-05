import prismaClient from "../../prisma";

class GetOrCreateCartService {
  async execute(userId: string) {

    let cart = await prismaClient.cart.findFirst({
      where: {
        userId
      }
    });

    if (!cart) {
      cart = await prismaClient.cart.create({
        data: {
          userId
        }
      });
    }

    return cart;
  }
}

export { GetOrCreateCartService };