import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    description: string

    @IsBoolean()
    isPublished: boolean

    @IsNumber()
    authorId: number

}