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
        try {
            return await this.usersService.create(body)
        } catch (error) {
            throw new BadRequestException('¡Error: duplicate user!',{ cause: error })
         }

    }

    @Delete(':id')
    delete( @Param('id', ParseIntPipe) id: number ){
       
    }

    @Patch(':id')
    update( @Param('id', ParseIntPipe) id:number, @Body() body:UpdateUserDto ){
        
    }


}
