import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

    // async findOne(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    //     const user = await this.prisma.user.findUnique({ where: { id } })

    //     if (!user) {
    //         throw new NotFoundException({
    //             message: `Usuario con id: ${id} no existe`,
    //             status: HttpStatus.NOT_FOUND
    //         })
    //     }
    //     return user

    // }

    async login(username: string, password: string) {

        /** Verify if user exits */
        const user = await this.prisma.user.findFirst({ where: { username } })

        if (!user) throw new UnauthorizedException(`Usuario *${username}* no encontrado`)

        /** validate password */
        const isOk = await this.passwordCompare(password, user.password)
        if(!isOk) throw new UnauthorizedException(`Password incorrect`)

        return user

    }

    async register( payload: AuthDto){

        return await this.prisma.user.create({
            data:{
                username: payload.username,
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

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data })
    }

    // async delete(id: Prisma.UserWhereUniqueInput): Promise<User> {
    //     const user = await this.userRepository.findOne({ where: { id }, relations: ['profile'] })

    //     if (!user) {
    //         throw new NotFoundException({
    //             message: `Usuario con id: ${id} no existe`,
    //             status: HttpStatus.NOT_FOUND
    //         })
    //     }

    //     await this.userRepository.delete(id)
    //     await this.profileRepository.delete(user.profile.id)
    //     return user

    // }

    // async update(id: number, payload: UpdateUserDto) {
    //     const user = await this.userRepository.findOne({ where: { id }, relations: ['profile'] })

    //     if (!user) {
    //         throw new NotFoundException({
    //             message: `Usuario con id: ${id} no existe`,
    //             status: HttpStatus.NOT_FOUND
    //         })
    //     }

    //     user.password = await this.passwordHash(payload.password)
    //     await this.userRepository.save(user)
    //     return user
    // }


}
