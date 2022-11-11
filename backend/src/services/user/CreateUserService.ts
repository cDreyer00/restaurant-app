import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        //verificar se tem email
        if (!email) {
            throw new Error("Email incorrect")
        }

        // verificar se ja tem email cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("user already exists");
        }

        const passwordHash = await hash(password, 8);
        
        // cadastra usuario
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }