import prismaClient from "../../prisma";
import { GetOrCreateCartService } from "./GetOrCreateCartService";

class AddToCartService {
  async execute(userId: string, product_id: string, quantity: number) {

    const cartService = new GetOrCreateCartService();
    const cart = await cartService.execute(userId);

    // 🔎 verifica se produto já existe no carrinho
    const existingItem = await prismaClient.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        product_id
      }
    });

    // ➕ se já existe, só soma quantidade
    if (existingItem) {
      return prismaClient.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity
        }
      });
    }

    // ➕ se não existe, cria novo item
    const item = await prismaClient.cartItem.create({
      data: {
        cart_id: cart.id,
        product_id,
        quantity
      }
    });

    return item;
  }
}

export { AddToCartService };