import { PrismaClient } from "@prisma/client"
import { hashSync } from 'bcryptjs'
const prisma = new PrismaClient()

export const UserSeeder = async () =>{
    
    /** Seed of admin */
    await prisma.user.upsert({

        where: { id: 1 },

        update: {
            username: 'admin',
            email: 'admin@host.com',
            password: hashSync("12345678", 10),
            roles:['ADMIN'],
            active: true,
        },

        create: {
            username: 'admin',
            email: 'admin@host.com',
            password: hashSync("12345678", 10),
            roles:['ADMIN'],
            active: true,
        },

    });

    /** Seed of user */
    await prisma.user.upsert({

        where: { id: 2 },

        update: {
            username: 'user',
            email: 'user@host.com',
            password: hashSync("12345678", 10),
            roles:['USER'],
            active: true,
        },

        create: {
            username: 'user',
            email: 'user@host.com',
            password: hashSync("12345678", 10),
            roles:['USER'],
            active: true,
        },

    });

   
}