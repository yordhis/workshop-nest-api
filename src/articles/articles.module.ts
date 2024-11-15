import { Module } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { CaslModule } from 'src/casl/casl.module';
import { ArticleService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Article, User ]), 
    CaslModule,
    UsersModule
  ],
  controllers: [ ArticlesController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ]
})
export class ArticlesModule {}
