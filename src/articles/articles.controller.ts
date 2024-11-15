import { Body, Controller, Get, Post, Req, Put, Param, ParseIntPipe, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ArticleService } from './articles.service'; import { CreateArticleDto } from './dto/create-articles.dto'

import { UpdateArticleDto } from './dto/update-articles.dto'
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/check-policies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/types/action.enum';
import { Article } from './entities/article.entity';
import { FilterArticleDto } from './dto/filter-articles.dto';



@Controller('articles')
export class ArticlesController {

    constructor(
        public readonly articleService: ArticleService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
    async all() {
        return await this.articleService.find()
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
    async show( @Param('id', ParseIntPipe) id: number ) {
        return await this.articleService.findOne(id)
    }

    @HttpCode(HttpStatus.OK)
    @Post('filter')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
    async filter(@Body() filter:FilterArticleDto ) {
        let result=[] 
       for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
            const fil = filter[key];
           
           result.push( { [key]: await this.articleService[key](fil)} )
        }
       }
        
        return result
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Article))
    async create(@Body() newArticle: CreateArticleDto, @Req() request: Request) {
        const user = request['user']
        return await this.articleService.create(newArticle, user)
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Article))
    async update(@Param('id', ParseIntPipe) articleId: number, @Body() upArticle: UpdateArticleDto) {
        return this.articleService.update(articleId, upArticle);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Article))
    delete(@Param('id', ParseIntPipe) articleId: number) {
        return this.articleService.delete(articleId)
    }

}
