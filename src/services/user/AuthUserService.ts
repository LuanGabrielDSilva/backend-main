import prismaClient from "../../prisma"; 
import { compare } from 'bcryptjs' 
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  password: string;
}

class AuthUserService{
  async execute({ email, password }: AuthRequest){

    // 🔥 buscar usuário correto
    const user = await prismaClient.user.findUnique({
      where:{
        email
      }
    })

    if(!user){
      throw new Error("User/password incorrect")
    }

    // 🔐 validar senha
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("User/password incorrect")
    }

    // 🔑 gerar token
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      coins: user.coins,
      balance: user.balance,
      token
    } 
  } 
} 
 
export { AuthUserService }