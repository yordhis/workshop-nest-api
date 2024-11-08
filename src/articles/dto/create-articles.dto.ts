import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    message: string

    @IsNotEmpty()
    @IsBoolean()
    isPublished: boolean

    @IsNotEmpty()
    @IsNumber()
    authorId: number

}