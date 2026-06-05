import prismaClient from "../../prisma";

interface VariantInput {
  color: string;
  image?: string;
  stock?: number;
}

class CreateProductService {
  async execute(
    name: string,
    price: number,
    description?: string,
    image?: string,
    variants?: VariantInput[]
  ) {
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        image,

        variants: Array.isArray(variants)
          ? {
              create: variants.map((variant) => ({
                color: variant.color || "default",
                image: variant.image || null,
                stock: Number(variant.stock || 0)
              }))
            }
          : undefined
      },

      include: {
        variants: true
      }
    });

    return product;
  }
}

export { CreateProductService };