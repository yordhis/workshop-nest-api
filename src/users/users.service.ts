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
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[] | []> {
        return await this.prisma.user.findMany()
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } })

        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }
        return user

    }

    async login(username: string, password: string) {

        /** Verify if user exits */
        const user = await this.userRepository.findOne({
            where: { username },
            select: ['id', 'username', 'password', 'roles', 'active']
        })
        if (!user) throw new UnauthorizedException(`Usuario *${username}* no encontrado`)

        /** validate password */
        const isOk = await this.passwordCompare(password, user.password)
        if(!isOk) throw new UnauthorizedException(`Password incorrect`)

        return user

    }

    async register( payload: AuthDto){

        const newUser = new User()
        newUser.username = payload.username
        newUser.password = await this.passwordHash(payload.password)
        newUser.active = true

        const createdUser = await this.userRepository.save(newUser)

        return createdUser
    }

    async passwordCompare(passwordPayload: string, passwordHash: string) {
        return compare(passwordPayload, passwordHash)
    }

    async passwordHash(password: string) {
        return hash(password, 10)
    }

    async create(payload: CreateUserDto) {
        const newProfile = new Profile()
        newProfile.name = payload.name
        newProfile.lastname = payload.lastname
        newProfile.email = payload.email
        newProfile.age = payload.age

        const createdProfile = await this.profileRepository.save(newProfile)

        const newUser = new User()
        newUser.username = payload.username
        newUser.password = await this.passwordHash(payload.password)
        newUser.roles =  payload.roles 
        newUser.active = true
        newUser.profile = createdProfile

        const createdUser = await this.userRepository.save(newUser)

        return createdUser
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['profile'] })

        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }

        await this.userRepository.delete(id)
        await this.profileRepository.delete(user.profile.id)
        return user

    }

    async update(id: number, payload: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['profile'] })

        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }

        user.password = await this.passwordHash(payload.password)
        await this.userRepository.save(user)
        return user
    }


}
