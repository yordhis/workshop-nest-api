import { User } from "@prisma/client"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    title: string

    user: User
    authorId: number

}