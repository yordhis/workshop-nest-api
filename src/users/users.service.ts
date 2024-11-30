import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }
        return user

    }

    async login(email: string, password: string) {

        /** Verify if user exits */
        const user = await this.prisma.user.findFirst({ where: { email } })

        if (!user) throw new UnauthorizedException(`Usuario *${email}* no encontrado`)

        /** validate password */
        const isOk = await this.passwordCompare(password, user.password)
        if(!isOk) throw new UnauthorizedException(`Password incorrect`)

        return user

    }

    async register( payload: AuthDto){
        return await this.prisma.user.create({
            data:{
                username: payload.email.split('@')[0],
                email: payload.email,
                password:  await this.passwordHash(payload.password)
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
        const user = this.prisma.user.create({ data })
        return user
    }

    async delete(id: Prisma.UserWhereUniqueInput) {
        /*** terminar */
    }

    async update(id: number, payload: any) {
        /*** terminar */
    }


}
