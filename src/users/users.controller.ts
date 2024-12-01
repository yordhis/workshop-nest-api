import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from './types/Roles';


@Roles(UserRoles.ADMIN)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.usersService.create(body)
    }

  

    @Patch(':id')
    async update( @Param('id', ParseIntPipe) where:number, @Body() data:UpdateUserDto ){
        
    }

    @Delete(':id')
    async delete( @Param('id', ParseIntPipe) id: number ){
       return await this.usersService.delete( { id } )
    }


}
