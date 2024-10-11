import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService { 
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,

        @InjectRepository(Profile)
        private readonly profileRepository:Repository<Profile>
    ){}

    async findAll(){
        return await this.userRepository.find()
    }

    async findOne( id: number ){
        const user = await this.userRepository.findOne({ where:{ id }, select: ['id', 'username'], relations:['profile'] }) 
        
        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }
        return user

    }

    async create(payload: CreateUserDto){
        const newProfile = new Profile()
        newProfile.name = payload.name
        newProfile.lastname = payload.lastname
        newProfile.email = payload.email
        newProfile.age = payload.age

        const createdProfile = await this.profileRepository.save(newProfile)

        const newUser = new User()
        newUser.username = payload.username
        newUser.password = payload.password
        newUser.active = true
        newUser.profile = createdProfile

        const createdUser = await this.userRepository.save(newUser)

        return createdUser
    }

    async delete(id: number){
        const user = await this.userRepository.findOne({ where:{ id }, relations:['profile'] }) 
        
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

    async update(id: number, payload: UpdateUserDto){
        const user = await this.userRepository.findOne({ where:{ id }, relations:['profile'] }) 
        
        if (!user) {
            throw new NotFoundException({
                message: `Usuario con id: ${id} no existe`,
                status: HttpStatus.NOT_FOUND
            })
        }

        user.password = payload.password
        await this.userRepository.save(user)
        return user
    }


}
