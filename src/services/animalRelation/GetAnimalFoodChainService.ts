import prismaClient from "../../prisma";

class GetAnimalFoodChainService {
  async execute(animalId: string) {

    const animal =
      await prismaClient.animal.findUnique({
        where: {
          id: animalId,
        },

        include: {

          preyRelations: {
            include: {
              prey: true,
            },
          },

          predatorRelations: {
            include: {
              predator: true,
            },
          },
        },
      });

    return animal;
  }
}

export { GetAnimalFoodChainService };