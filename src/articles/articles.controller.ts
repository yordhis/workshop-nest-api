import { Body, Controller, Get, Post, Req, Put, Param, ParseIntPipe, Delete, HttpCode, HttpStatus } from '@nestjs/common'
import { ArticleService } from './articles.service'; 
import { CreateArticleDto } from './dto/create-articles.dto'
import { UpdateArticleDto } from './dto/update-articles.dto'
import { FilterArticleDto } from './dto/filter-article.dto';



@Controller('articles')
export class ArticlesController {

    constructor(
        public readonly articleService: ArticleService,
    ) { }

    @Get()
    async all() {
        return await this.articleService.find()
    }


    @Get(':id')
    async show( @Param('id', ParseIntPipe) id: number ) {
        return await this.articleService.findOne(id)
    }

    @HttpCode(HttpStatus.OK)
    @Post('filter')
    async filter(@Body() params: FilterArticleDto  ) {
        return await this.articleService.filter(params)
    }

    @Post()
    async create(@Body() newArticle: CreateArticleDto, @Req() request: Request) {
        const user = request['user']
        return await this.articleService.create(newArticle, user)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() data: UpdateArticleDto ) {
        return this.articleService.update( { where: { id }, data } );
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number ) {
        return this.articleService.delete( { id } )
    }

}
