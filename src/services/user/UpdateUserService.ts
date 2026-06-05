import prismaClient from "../../prisma";

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

class UpdateUserService {
  async execute({ id, name, email }: UpdateUserRequest) {

    if (!id) {
      throw new Error("ID inválido");
    }

    const user = await prismaClient.user.update({
      where: { id },
      data: {
        name,
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        coins: true,
        balance: true
      }
    });

    return user;
  }
}

export { UpdateUserService };