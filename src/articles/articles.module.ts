import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticleService } from './articles.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [ 
    UsersModule,
    PrismaModule
  ],
  controllers: [ ArticlesController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ]
})
export class ArticlesModule {}
