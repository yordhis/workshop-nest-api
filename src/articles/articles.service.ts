import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-articles.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./entities/article.entity";
import { Like, Repository } from "typeorm";
import { UpdateArticleDto } from "./dto/update-articles.dto";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        public readonly articleRepository: Repository<Article>
    ){}

    async find(){
        return await this.articleRepository.find({})
    }
    
    async findOne(id: number){
        return await this.articleRepository.findOneBy({ id })
    }
   
    async filterForMessage( description: string ){
        return await this.articleRepository.findBy({ description: Like(`%${description}%`)  })
    }
   
    async filterForAuthor( authorId: number ){
        return await this.articleRepository.find({  where:{ authorId } })
    }

    async create(createArticleDto: CreateArticleDto){
        const newArticle = new Article
        newArticle.authorId = createArticleDto.authorId
        newArticle.description = createArticleDto.description
        newArticle.isPublished = createArticleDto.isPublished

        return await this.articleRepository.save(newArticle)
    }

    async update(id: number, data: UpdateArticleDto){
        const article = await this.articleRepository.findOneBy({ id })

        if(!article){
            throw new NotFoundException({
                message: `Articulo id: ${id} no hallado.`,
                status: HttpStatus.NOT_FOUND
            })
        }

        article.description = data.description
        await this.articleRepository.save(article)
        return article
    }
}