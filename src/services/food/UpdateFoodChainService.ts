import prisma from "../../prisma";

class UpdateFoodChainService {
  async execute(predatorId: string, preyIds: string[]) {

    // 🔥 remove antigas relações
    await prisma.predatorRelation.deleteMany({
      where: { predatorId }
    });

    // 🔥 cria novas relações
    return await prisma.$transaction(
      preyIds.map(preyId =>
        prisma.predatorRelation.create({
          data: {
            predatorId,
            preyId
          }
        })
      )
    );
  }
}

export { UpdateFoodChainService };