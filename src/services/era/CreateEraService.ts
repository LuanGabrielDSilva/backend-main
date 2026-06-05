import prisma from "../../prisma";

interface EraRequest {
  name: string;
  description?: string;
  image?: string;
}

class CreateEraService {
  async execute({ name, description, image }: EraRequest) {

    if (!name) {
      throw new Error("Nome da era é obrigatório");
    }

    const era = await prisma.era.create({
      data: {
        name,
        description,
        image
      }
    });

    return era;
  }
}

export { CreateEraService };