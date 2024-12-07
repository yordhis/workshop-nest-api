import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { AuthResetPassDto } from './dto/auth-reset-password.dto';


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
  async register(@Body() payload: AuthDto) {
    try {
      return await this.authService.register( payload );
    } catch (error) {
      throw new BadRequestException('¡Duplicate user!', {cause:error})
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('reset-password')
  async resetPassword(@Body() payload: AuthResetPassDto){
    return await payload
  }

}
