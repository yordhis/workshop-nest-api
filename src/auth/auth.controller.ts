import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  login(@Body() payload: AuthDto) {
    return this.authService.login( payload );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @Public()
  register(@Body() payload: AuthDto) {
   
    return this.authService.register( payload );
  }

}
