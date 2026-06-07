import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const token = authToken.replace("Bearer ", "");

    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;

    const user = await prismaClient.user.findUnique({
      where: { id: sub },
      select: {
        id: true,
        role: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário inválido" });
    }

    // 🔥 PADRÃO ÚNICO DO PROJETO
    req.user = {
      id: user.id,
      role: user.role
    };

    return next();

  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}