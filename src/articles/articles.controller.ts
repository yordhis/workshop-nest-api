import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './articles.service';;

@Controller('articles')
export class ArticlesController {
    
    constructor(
        public readonly articleService: ArticleService
    ){}

    @Get()
    async all(){
        return await this.articleService.find()
    }

}
