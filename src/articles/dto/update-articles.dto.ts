import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    message: string

    @IsBoolean()
    isPublished: boolean

    @IsNumber()
    authorId: number

}