import prismaClient from "../../prisma";

interface Request {
  userId: string;

  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;

  complemento?: string;
}

export class CreateOrderService {
  async execute({
    userId,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    complemento
  }: Request) {

    console.log("🔥 CREATE ORDER FOI CHAMADO", userId);

    /* =========================
       BUSCAR CARRINHO
    ========================= */
    const cart = await prismaClient.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    console.log("🛒 CART ENCONTRADO:", JSON.stringify(cart, null, 2));

    if (!cart || cart.items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    /* =========================
       CALCULAR TOTAL
    ========================= */
    const total = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    /* =========================
       BUSCAR USUÁRIO
    ========================= */
    const user = await prismaClient.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    /* =========================
       VERIFICAR SALDO
    ========================= */
    if (user.balance < total) {
      throw new Error("Saldo insuficiente");
    }

    /* =========================
       DESCONTAR SALDO
    ========================= */
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: total
        }
      }
    });

    /* =========================
       CRIAR PEDIDO
    ========================= */
    const order = await prismaClient.order.create({
      data: {
        user: {
          connect: { id: userId }
        },

        total,
        status: "pending",

        /* =========================
           ENDEREÇO
        ========================= */
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        complemento,

        /* =========================
           ITENS
        ========================= */
        items: {
          create: cart.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },

      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    /* =========================
       LIMPAR CARRINHO
    ========================= */
    await prismaClient.cartItem.deleteMany({
      where: {
        cart_id: cart.id
      }
    });

    return order;
  }
}