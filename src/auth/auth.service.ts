import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login( credentials: AuthDto ) {
    const { username, password } = credentials

    const user = await this.usersService.login( username, password )

    const payload = { 
      id: user.id,
      username: user.username,
      roles: user.roles,
      active: user.active
    }

    const token = await this.jwtService.signAsync(payload)
    
    return {
       access_token: token
    }
  }

  async register( payload: AuthDto ) {
    const user = await this.usersService.register( payload ) 
    return user
  } 

}
