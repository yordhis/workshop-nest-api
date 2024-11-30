import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateArticleDto } from "./dto/create-articles.dto"
import { PrismaService } from "src/prisma/prisma.service"
import { Article, Prisma } from "@prisma/client"

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) {}

    async find(): Promise<Article[]> {
        const results = await this.prisma.article.findMany({include:{ users:true }})
        if( !results.length ) throw new NotFoundException('No hay resultados')
        return results
    }
    
    async findOne(id: number): Promise< Article | null >{
        const article = await this.prisma.article.findUnique({ 
            where: { id } ,  
            include: { users:true }
        })

        if(!article) throw new NotFoundException('Articulo no encontrado!')
        
        return  article
    }
   
    async filter( params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ArticleWhereUniqueInput;
        where?: Prisma.ArticleWhereInput;
        orderBy?: Prisma.ArticleOrderByWithRelationInput;
    } ): Promise<Article[]>{
 
            const { skip, take, cursor, where, orderBy } = params;
            const results =  await this.prisma.article.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            })
    
            if( !results.length ) throw new NotFoundException('No hay resultados')
    
            return results
    }
   
    async create(data: CreateArticleDto, user:any): Promise<Article>{
        data.authorId = user.id
        return await this.prisma.article.create({
            data
        })
    }

    async update(params: { 
        where: Prisma.ArticleWhereUniqueInput,
        data: Prisma.ArticleUpdateInput
    }): Promise<Article>{
        const { where, data } = params
        
        await this.findOne(where.id)

        return this.prisma.article.update({
            data,
            where
        })
    }

    async delete(where: Prisma.ArticleWhereUniqueInput): Promise<Article>{

        await this.findOne(where.id)

        return this.prisma.article.delete({
            where
        })

    }
}