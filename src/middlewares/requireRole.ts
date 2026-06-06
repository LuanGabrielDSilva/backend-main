import { Request, Response, NextFunction } from "express";

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // 1. verifica se user existe
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    // 2. verifica se role bate com as permitidas
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    // 3. liberado
    return next();
  };
}