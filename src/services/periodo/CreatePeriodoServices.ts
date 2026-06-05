import prisma from "../../prisma";


interface PeriodoRequest {
  name: string;
  description?: string;
  image?: string;
  eraId: string;
}

class CreatePeriodoService {
  async execute({ name, description, image, eraId }: PeriodoRequest) {

    // 🔐 validar era
    const eraExists = await prisma.era.findUnique({
      where: { id: eraId }
    });

    if (!eraExists) {
      throw new Error("Era não encontrada");
    }

    const periodo = await prisma.periodo.create({
      data: {
        name,
        description,
        image,
        eraId
      }
    });

    return periodo;
  }
}

export { CreatePeriodoService };