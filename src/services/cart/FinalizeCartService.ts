import prismaClient from "../../prisma";

class FinalizeCartService {

  async execute(userId: string) {

    const cart = await prismaClient.cart.findFirst({
      where: {
        userId,
        status: "open"
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      throw new Error("Carrinho não encontrado");
    }

    // calcula total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // pega usuário
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // saldo insuficiente
    if (user.balance < total) {
      throw new Error("Saldo insuficiente");
    }

    // desconta saldo
    await prismaClient.user.update({
      where: {
        id: userId
      },
      data: {
        balance: user.balance - total
      }
    });

    // fecha carrinho
    await prismaClient.cart.update({
      where: {
        id: cart.id
      },
      data: {
        status: "finished"
      }
    });

    await prismaClient.expedition.create({
      data: {
        userId: userId,
        title: "Compra no Acervo Paleontológico",
        description: `Compra de ${cart.items.length} item(s)`,
        status: "completed",
        location: "Loja do Museu",
        rewardCoins: Math.floor(total),
        rewardXp: Math.floor(total / 10),

        products: {
          connect: cart.items.map((item) => ({
            id: item.product.id
          }))
        }
      }
    });

    return {
      message: "Compra finalizada",
      total
    };

  }

}

export { FinalizeCartService };