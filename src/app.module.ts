import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {  UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { ArticlesModule } from './articles/articles.module';
import { HttpExceptionFilter } from './handlers/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ArticlesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: PoliciesGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

  ],
})
export class AppModule { }
