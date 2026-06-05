import prismaClient from "../../prisma";

interface AnimalRequest {
  id: string;
  name?: string;
  scientificName?: string;
  size?: string;
  weight?: string;
  image?: string;
  dieta?: string;
  habitat?: string;
  clima?: string;
  locomotion?: string;
  defense?: string;
  local?: string;
  descoberta?: string;
  description?: string;
  periodoId?: string;
  preyIds?: string[];
  predatorIds?: string[];
}

class UpdateAnimalService {

  async execute({
    id,
    name,
    scientificName,
    size,
    weight,
    image,
    dieta,
    habitat,
    clima,
    locomotion,
    defense,
    local,
    descoberta,
    description,
    periodoId,
    preyIds,
    predatorIds
  }: AnimalRequest) {

    if (!id) {
      throw new Error("ID inválido");
    }

    const existingAnimal =
      await prismaClient.animal.findUnique({
        where: { id }
      });

    if (!existingAnimal) {
      throw new Error("Animal não encontrado");
    }

    // remove duplicados e valores vazios
    const uniquePreyIds = preyIds
      ? [...new Set(preyIds)].filter(Boolean)
      : [];

    const uniquePredatorIds = predatorIds
      ? [...new Set(predatorIds)].filter(Boolean)
      : [];

    // 🦖 atualiza dados do animal
    await prismaClient.animal.update({

      where: { id },

      data: {

        ...(name !== undefined && { name }),

        ...(scientificName !== undefined && {
          scientificName
        }),

        ...(size !== undefined && { size }),

        ...(weight !== undefined && { weight }),

        ...(image !== undefined && { image }),

        ...(dieta !== undefined && { dieta }),

        ...(habitat !== undefined && { habitat }),

        ...(clima !== undefined && { clima }),

        ...(locomotion !== undefined && {
          locomotion
        }),

        ...(defense !== undefined && {
          defense
        }),

        ...(local !== undefined && { local }),

        ...(descoberta !== undefined && {
          descoberta
        }),

        ...(description !== undefined && {
          description
        }),

        ...(periodoId !== undefined && {
          periodo: {
            connect: {
              id: periodoId
            }
          }
        })

      }

    });

    // 🍖 atualiza cadeia alimentar
    if (preyIds !== undefined) {

      if (uniquePreyIds.includes(id)) {
          throw new Error(
            "Um animal não pode ser presa dele mesmo"
          );
        }

        if (uniquePredatorIds.includes(id)) {
          throw new Error(
            "Um animal não pode ser predador dele mesmo"
          );
        }

        if (predatorIds !== undefined) {

  await prismaClient.predatorRelation.deleteMany({
    where: {
      preyId: id
    }
  });

  if (uniquePredatorIds.length > 0) {

    await prismaClient.predatorRelation.createMany({

      data: uniquePredatorIds.map(predatorId => ({
        predatorId,
        preyId: id
      })),

      skipDuplicates: true

    });

  }

}

      // remove relações antigas
      await prismaClient.predatorRelation.deleteMany({
        where: {
          predatorId: id
        }
      });

      // cria novas relações
      if (uniquePreyIds.length > 0) {

        await prismaClient.predatorRelation.createMany({

          data: uniquePreyIds.map(preyId => ({
            predatorId: id,
            preyId
          })),

          skipDuplicates: true

        });

      }

    }

    // 🔥 retorna animal atualizado
    return await prismaClient.animal.findUnique({

      where: { id },

      include: {

        periodo: {
          include: {
            era: true
          }
        },

        // animais que ele caça
        preys: {
          include: {
            prey: true
          }
        },

        // animais que caçam ele
        predators: {
          include: {
            predator: true
          }
        }

      }

    });

  }

}

export { UpdateAnimalService };