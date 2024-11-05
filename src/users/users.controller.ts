import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from './types/Roles';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

@Get()
@Roles(UserRoles.ADMIN)
findAll(){
    return this.usersService.findAll()
}

@Get(":id")
findOne(@Param('id', ParseIntPipe ) id: number ){
    return this.usersService.findOne(id)
}

@Post()
create( @Body() body: CreateUserDto ){
    return this.usersService.create( body )
}

@Delete(":id")
delete( @Param('id', ParseIntPipe) id: number ){
    return this.usersService.delete( id )
}

@Patch(":id")
update( @Param('id', ParseIntPipe) id:number, @Body() body:UpdateUserDto ){
    return this.usersService.update(id, body)
}


}
