import prismaClient from "../../prisma";
import crypto from "crypto";

import transporter from "../../config/mail";

class ForgotPasswordService {
  async execute(email: string) {

    /*======================================
      O sistema verifica se o email existe
    =======================================*/

    const user =
      await prismaClient.user.findUnique({
        where: { email },
      });

    /*
    =========================================
    NÃO revela se email existe
    =========================================
    */
    if (!user) {
      return {
        message:
          "Se o email existir, você receberá um link.",
      };
    }

    /*
    =========================================
    GERA TOKEN
    =========================================
    */
    const token = crypto
      .randomBytes(32)
      .toString("hex");

    /*
    =========================================
    EXPIRA EM 30 MIN
    =========================================
    */
    const expires = new Date(
      Date.now() + 1000 * 60 * 30
    );

    /*
    =========================================
    SALVA TOKEN
    =========================================
    */
    await prismaClient.user.update({
      where: {
        id: user.id,
      },

      data: {
        reset_token: token,
        reset_token_expires: expires,
      },
    });

    /*
    =========================================
    LINK RESET
    =========================================
    */
    const resetLink =
      `http://localhost:5173/reset-password?token=${token}`;

    /*
    =========================================
    ENVIA EMAIL
    =========================================
    */
    await transporter.sendMail({

      from:
        "luangabrieldsilva05@gmail.com",

      to: email,

      subject:
        "Recuperação de senha",

      html: `
        <div style="
          font-family: Arial;
          padding: 20px;
        ">

          <h2>
            Recuperação de senha
          </h2>

          <p>
            Clique no botão abaixo
            para redefinir sua senha:
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#c6a46c;
              color:white;
              text-decoration:none;
              border-radius:8px;
              margin-top:12px;
            "
          >
            Resetar senha
          </a>

          <p style="margin-top:20px;">
            O link expira em 30 minutos.
          </p>

        </div>
      `,
    });

    return {
      message:
        "Email enviado com sucesso.",
    };
  }
}

export { ForgotPasswordService };