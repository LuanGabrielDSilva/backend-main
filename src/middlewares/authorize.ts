import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export function authorize(roles: string[] = []) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        return res.status(401).json({ error: "Token não informado" });
      }

      const [, token] = authToken.split(" ");

      const { sub } = verify(
        token,
        process.env.JWT_SECRET as string
      ) as Payload;

      const userId = sub;

      // 🔎 busca usuário
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true }
      });

      if (!user) {
        return res.status(401).json({ error: "Usuário inválido" });
      }

      // 🔐 valida roles (se tiver)
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      // 💾 salva no request
      req.userId = user.id;

      return next();

    } catch (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
}