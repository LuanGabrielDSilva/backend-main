import prismaClient from "../../prisma";

interface VariantInput {
  color: string;
  image?: string;
  stock?: number;
}

class UpdateProductService {

  async execute(
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    variants: VariantInput[]
  ) {

    const product = await prismaClient.product.update({
      where: {
        id
      },

      data: {
        name,
        price,
        description,
        image,

        variants: {
          deleteMany: {},

         create: variants?.map((variant) => ({
          color: variant.color,
          image: variant.image,
          stock: variant.stock || 0
        })) || []
        }
      },

      include: {
        variants: true
      }
    });

    return product;
  }
}

export { UpdateProductService };