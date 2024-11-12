import { Body, Controller, Get, Post, Req, Put, Param, ParseIntPipe, Delete } from '@nestjs/common'
import { ArticleService } from './articles.service'; import { CreateArticleDto } from './dto/create-articles.dto'

import { UpdateArticleDto } from './dto/update-articles.dto'

@Controller('articles')
export class ArticlesController {

    constructor(
        public readonly articleService: ArticleService,
      
    ) { }

    @Get()
    async all( @Req() request: Request ) {
        const user = request['user']
        return await this.articleService.find(user)
    }

    @Post()
    async create(@Body() newArticle: CreateArticleDto, @Req() request: Request) {
        const user = request['user']
        return await this.articleService.create(newArticle, user)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) articleId: number, @Body() upArticle: UpdateArticleDto) {
        return this.articleService.update(articleId, upArticle);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) articleId: number) {
        return this.articleService.delete(articleId)
    }

}
