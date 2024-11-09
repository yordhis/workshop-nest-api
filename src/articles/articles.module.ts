import { Module } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { CaslModule } from 'src/casl/casl.module';
import { ArticleService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Article ]), 
    CaslModule 
  ],
  controllers: [ ArticlesController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ]
})
export class ArticlesModule {}
