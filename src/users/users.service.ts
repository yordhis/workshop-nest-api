import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs'
import { AuthDto } from 'src/auth/dto/auth.dto';

/** prisma db */
import { User, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[] | []> {
        return await this.prisma.user.findMany()
    }

    async findOne( id: number ): Promise<User | null> {

        const user = await this.prisma.user.findUnique({ where: { id } })
        
        if (!user) throw new NotFoundException('User does not exist')

        return user

    }

    async login(email: string, password: string): Promise<User | null> {

        /** Verify if user exits */
        const user = await this.prisma.user.findFirst({ where: { email } })

        if (!user) throw new UnauthorizedException(`User *${email}* not found`)

        /** validate password */
        const isOk = await this.passwordCompare(password, user.password)
        if(!isOk) throw new UnauthorizedException(`Password incorrect`)

        return user

    }

    async register( data: AuthDto): Promise<User | null>{
        const { email } = data
        const userExists = await this.prisma.user.findUnique({ where: { email } })

        if(userExists) throw new BadRequestException('Registered user on our platform')

        return await this.prisma.user.create({
            data:{
                username: data.email.split('@')[0],
                email: data.email,
                password:  await this.passwordHash(data.password)
            }
        })
    }

    async passwordCompare(passwordPayload: string, passwordHash: string) {
        return compare(passwordPayload, passwordHash)
    }

    async passwordHash(password: string) {
        return hash(password, 10)
    }

    async create(data: Prisma.UserCreateInput): Promise<User | string> {
        const { email } = data
        const userExists = await this.prisma.user.findUnique({ where: { email } })

        if(userExists) throw new BadRequestException('Registered user on our platform')

        const user = this.prisma.user.create({ 
            data:{
                username: data.email.split('@')[0],
                email: data.email,
                password:  await this.passwordHash(data.password)
            }
         })

        return user
    }

    async delete(where: Prisma.UserWhereUniqueInput) {
        const { id } = where

        await this.findOne(id)

        return await this.prisma.user.delete({ where: { id } })

    }

    async update(where: number, data: any) {
        /*** terminar */
    }


}
