import prismaClient from "../../prisma";

class RemoveItemService {
  async execute(item_id: string) {

    await prismaClient.cartItem.delete({
      where: { id: item_id }
    });

    return { message: "Item removido" };
  }
}

export { RemoveItemService };