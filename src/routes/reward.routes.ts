import { Router } from "express";
import prismaClient from "../prisma";

const router = Router();

/* ======================
   💰 REWARD PLAYER
====================== */
router.post("/", async (req, res) => {
  try {
    console.log("🔥 [REWARD] Requisição recebida:");
    console.log(req.body);

    const { userId, coins, source, achievementId } = req.body;

    if (!userId || !coins || isNaN(Number(coins))) {
      return res.status(400).json({
        error: "userId e coins são obrigatórios e válidos"
      });
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        coins: {
          increment: Number(coins)
        }
      },
      select: {
        id: true,
        name: true,
        coins: true,
        balance: true
      }
    });

    console.log("✅ [REWARD] Usuário atualizado com sucesso:", updatedUser);

    return res.json({
      success: true,
      message: "Moedas adicionadas com sucesso",
      user: updatedUser
    });

  } catch (err: any) {
    console.error("❌ [REWARD] Erro:", err.message);

    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(500).json({
      error: "Erro interno ao adicionar moedas"
    });
  }
});

export default router;