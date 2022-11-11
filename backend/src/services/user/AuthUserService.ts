import { prisma } from "@prisma/client";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs"

interface AuthRequest{
    email: string;
    password: string;
}
    

class AuthUserService{
    async execute({email, password}: AuthRequest){
        
        // verificar se email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("incorrect User")
        }

        // verificar se a senha ta correta
        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch){
            throw Error("incorrect Password");
        }

        return {email, password}
    }
}

export { AuthUserService };