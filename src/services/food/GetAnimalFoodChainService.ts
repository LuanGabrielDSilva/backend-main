import prismaClient from "../../prisma";

class GetAnimalFoodChainService {
  async execute(animalId: string) {

    const animal = await prismaClient.animal.findUnique({
      where: { id: animalId },

      include: {
        preys: {
          include: {
            prey: true, // vem do PredatorRelation
          },
        },

        predators: {
          include: {
            predator: true, // vem do PredatorRelation
          },
        },
      },
    });

    return animal;
  }
}

export { GetAnimalFoodChainService };