import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { CreateArticleDto } from "./dto/create-articles.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Article } from "./entities/article.entity"
import { Like, Repository } from "typeorm"
import { UpdateArticleDto } from "./dto/update-articles.dto"
import { CaslAbilityFactory } from "src/casl/casl-ability.factory"
import { Action } from "src/casl/types/action.enum"

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        public readonly articleRepository: Repository<Article>,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ){}

    async find( user:any ) {
        const ability = this.caslAbilityFactory.createForUser(user)
        if( !ability.can(Action.Read, Article) ) throw new UnauthorizedException()
        return await this.articleRepository.find({ relations: ['authorId']})
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

    async create(createArticleDto: CreateArticleDto, user:any){

        const ability = this.caslAbilityFactory.createForUser(user)
        if( !ability.can(Action.Create, Article) ) throw new UnauthorizedException()

        const newArticle = new Article
        newArticle.authorId = user.id
        newArticle.description = createArticleDto.description
        
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
        /** Se setean los nuevos datos */
        article.description = data.description
        article.isPublished = data.isPublished
        await this.articleRepository.save(article)

        return article
    }

    async delete(id: number){
        const article = await this.articleRepository.findOneBy({ id })

        if (!article) {
            throw new NotFoundException({
                message:  `El articulo con id: ${id}, no existe.`,
                status: HttpStatus.NOT_FOUND
            })
        }

        await this.articleRepository.delete(id)

        return article

    }
}