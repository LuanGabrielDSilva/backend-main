/// <reference path="../types.d.ts" />

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // 📥 pega o header
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ error: "Token não informado" });
    }

    // 🔪 separa "Bearer token"
    const [, token] = authToken.split(" ");

    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // 🔐 valida JWT
    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;

    // 🧠 busca usuário no banco
    const user = await prismaClient.user.findUnique({
      where: { id: sub },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário inválido" });
    }

    // 💾 injeta no request
    req.user = {
      id: user.id,
      role: user.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}