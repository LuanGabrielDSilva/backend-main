import prismaClient from "../../prisma";

class DetailUserService {

  async execute(userId: string) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      },

      select: {
        id: true,
        name: true,
        email: true,

        // 👤 cargo
        role: true,

        // 💰 carteira
        balance: true,
        coins: true,

        // ❤️ favoritos
        favorites: {
          include: {
            animal: true
          }
        }
      }
    });

    return user;

  }
}

export { DetailUserService };