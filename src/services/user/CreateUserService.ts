import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

class CreateUserService {
  async execute({ name, email, password, role }: UserRequest) {

    if (!name || !email || !password) {
      throw new Error("Preencha todos os campos");
    }

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role: role || "user",

        // 🎮 HUB ECONOMY START
        coins: 0,
        
      },
      select: {
        id: true,
        name: true,
        email: true,
        coins: true,
        role: true
      }
    });

    return user;
  }
}

export { CreateUserService };