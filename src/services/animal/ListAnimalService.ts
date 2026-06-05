import prisma from "../../prisma";

class ListAnimalService {

  async execute() {

    const animals = await prisma.animal.findMany({

      include: {

        periodo: {
          include: {
            era: true
          }
        },

        // 🦖 O QUE O ANIMAL CAÇA
        preys: {
          include: {
            prey: true
          }
        },

        // 🦴 O QUE CAÇA O ANIMAL
        predators: {
          include: {
            predator: true
          }
        }

      }

    });

    return animals;
  }
}

export { ListAnimalService };