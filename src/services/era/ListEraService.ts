import prisma from "../../prisma";

class ListEraService {
  async execute() {
    return await prisma.era.findMany();
  }
}

export { ListEraService };