import prismaClient from "../../prisma";

class DeleteOrderService {

  async execute(id: string) {

    // deleta itens do pedido
    await prismaClient.orderItem.deleteMany({
      where: {
        orderId: id
      }
    });

    // deleta pedido
    await prismaClient.order.delete({
      where: {
        id
      }
    });

    return true;
  }
}

export { DeleteOrderService };