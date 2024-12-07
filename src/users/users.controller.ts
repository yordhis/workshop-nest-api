import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put 
} from '@nestjs/common';
import { UsersService } from './users.service';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from './types/Roles';
import { Prisma } from '@prisma/client';


@Roles(UserRoles.ADMIN)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: Prisma.UserWhereUniqueInput
    ){
        return this.usersService.findOne( id )
    }

    @Post()
    async create(
        @Body() data: Prisma.UserCreateInput
    ){
        return await this.usersService.create(data)
    }

  

    @Put(':id')
    async update( 
        @Param('id', ParseIntPipe) id: number , 
        @Body() data: Prisma.UserUpdateInput
    ){
        return await this.usersService.update( { id }, data) 
    }

    @Delete(':id')
    async delete( 
        @Param('id', ParseIntPipe) id: number
    ){
       return await this.usersService.delete( { id } )
    }


}
