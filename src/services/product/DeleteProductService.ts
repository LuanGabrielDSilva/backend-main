import prismaClient from "../../prisma";

class DeleteProductService {
  async execute(id: string) {

    if (!id) {
      throw new Error("ID inválido");
    }

    // remove variantes primeiro (dependência)
    await prismaClient.productVariant.deleteMany({
      where: {
        productId: id
      }
    });

    // remove produto
    const product = await prismaClient.product.delete({
      where: {
        id
      }
    });

    return product;
  }
}

export { DeleteProductService };