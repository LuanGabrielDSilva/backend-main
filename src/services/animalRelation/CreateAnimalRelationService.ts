import prismaClient from "../../prisma";

interface Request {
  predatorId: string;
  preyId: string;
}

class CreatepredatorRelationService {
  async execute({
    predatorId,
    preyId,
  }: Request) {

    if (predatorId === preyId) {
      throw new Error("Um animal não pode caçar ele mesmo");
    }

    const relation =
      await prismaClient.predatorRelation.create({
        data: {
          predatorId,
          preyId,
        },
      });

    return relation;
  }
}

export { CreatepredatorRelationService };