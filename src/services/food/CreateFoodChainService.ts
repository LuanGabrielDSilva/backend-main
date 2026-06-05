import prismaClient from "../../prisma";

interface FoodChainRequest {
  predatorId: string;
  preyId: string;
}

class CreateFoodChainService {
  async execute({ predatorId, preyId }: FoodChainRequest) {

    if (predatorId === preyId) {
      throw new Error("Um animal não pode caçar ele mesmo");
    }

    const predatorExists = await prismaClient.animal.findUnique({
      where: {
        id: predatorId
      }
    });

    const preyExists = await prismaClient.animal.findUnique({
      where: {
        id: preyId
      }
    });

    if (!predatorExists || !preyExists) {
      throw new Error("Animal inválido");
    }

    const relation = await prismaClient.predatorRelation.create({
      data: {
        predatorId,
        preyId
      }
    });

    return relation;
  }
}

export { CreateFoodChainService };