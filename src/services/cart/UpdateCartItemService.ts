import prismaClient from "../../prisma";

class UpdateCartItemService {
  async execute(item_id: string, quantity: number) {

    if (quantity <= 0) {
      await prismaClient.cartItem.delete({
        where: { id: item_id }
      });

      return { message: "Item removido" };
    }

    const item = await prismaClient.cartItem.update({
      where: { id: item_id },
      data: {
        quantity
      }
    });

    return item;
  }
}

export { UpdateCartItemService };