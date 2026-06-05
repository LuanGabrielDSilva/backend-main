import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

class ResetPasswordService {
  async execute(
    token: string,
    password: string
  ) {

    const user =
      await prismaClient.user.findFirst({
        where: {
          reset_token: token,
          reset_token_expires: {
            gt: new Date(),
          },
        },
      });

    if (!user) {
      throw new Error(
        "Token inválido ou expirado"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prismaClient.user.update({
  where: {
    id: user.id,
  },
  data: {
    password: hashedPassword,
    reset_token: null,
    reset_token_expires: null,
  },
});

    return {
      message: "Senha alterada",
    };
  }
}

export { ResetPasswordService };