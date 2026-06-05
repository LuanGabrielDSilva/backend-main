import prisma from "../../prisma";

class ListAnimalByEraService {
  async execute(eraId: string) {

    const animals = await prisma.animal.findMany({
      where: {
        periodo: {
          eraId: eraId
        }
      },
      include: {
        periodo: {
          include: {
            era: true
          }
        }
      }
    });

    // 🔐 validação baseada no resultado
    if (animals.length === 0) {
      throw new Error("Nenhum animal encontrado para essa era");
    }

    return animals.map(a => ({
      id: a.id,
      name: a.name,
      size: a.size,
      image: a.image,
      periodo: a.periodo.name,
      era: a.periodo.era.name
    }));
  }
}

export { ListAnimalByEraService };