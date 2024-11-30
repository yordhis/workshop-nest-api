import { Prisma } from "@prisma/client";
import { IsNumber } from "class-validator";

export class FilterArticleDto {
    
    skip?: number;
    take?: number;
    cursor?: Prisma.ArticleWhereUniqueInput;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
}