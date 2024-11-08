import { Module } from '@nestjs/common';
import { ArticlesControllerController } from './articles.controller.controller';
import { ArticlesController } from './articles.controller';

@Module({
  controllers: [ArticlesControllerController, ArticlesController]
})
export class ArticlesModule {}
