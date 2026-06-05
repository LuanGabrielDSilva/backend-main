import prismaClient from "../../prisma";

interface UpdateEraRequest {
  id: string;
  name?: string;
  description?: string;
  image?: string;
}

class UpdateEraService {
  async execute({ id, name, description, image }: UpdateEraRequest) {

    if (!id) {
      throw new Error("ID inválido");
    }

    const era = await prismaClient.era.update({
      where: { id },
      data: {
        name,
        description,
        image
      }
    });

    return era;
  }
}

export { UpdateEraService };