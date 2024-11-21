import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { CreateArticleDto } from "./dto/create-articles.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Article } from "./entities/article.entity"
import { Like, Repository } from "typeorm"
import { UpdateArticleDto } from "./dto/update-articles.dto"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        public readonly articleRepository: Repository<Article>,
        @InjectRepository(User)
        public readonly userRepository: Repository<User>
    ){}

    async find( ) {
        return await this.articleRepository.find({ relations: ['user']})
    }
    
    async findOne(id: number){
        const article = await this.articleRepository.findOne({ where:{id}, relations:['user'] })
        if(!article){
            throw new NotFoundException(`El articulo con el id:${id}, no existe!.`)
        }
        return  article
    }
   
    async filterForMessage( content: string ){
        return await this.articleRepository.find({ where: { content: Like(`%${content}%`) }, relations:['user'] })
    }
   
    async filterForAuthor( userId: number ){
        const user = await this.userRepository.findOneBy({id:userId})
        return await this.articleRepository.find({ where: { user }, relations:['user'] })
    }

    async create(createArticleDto: CreateArticleDto, user:any){

        const newArticle = new Article
        newArticle.authorId = user.id
        newArticle.user = user
        newArticle.title = createArticleDto.title
        newArticle.content = createArticleDto.description
        
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
        article.title = data.title
        article.content = data.content
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