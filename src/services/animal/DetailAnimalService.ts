import prisma from "../../prisma";

class DetailAnimalService {

  async execute(id: string) {

    const animal = await prisma.animal.findUnique({

      where: {
        id
      },

      include: {

        periodo: {
          include: {
            era: true
          }
        },

        // 🦖 animais que ele caça
        preys: {
          include: {
            prey: true
          }
        },

        // 🦴 animais que caçam ele
        predators: {
          include: {
            predator: true
          }
        }

      }

    });

    if (!animal) {
      throw new Error("Animal não encontrado");
    }

    return animal;

  }

}

export { DetailAnimalService };