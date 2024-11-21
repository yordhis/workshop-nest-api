import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsBoolean()
    @IsNotEmpty()
    isPublished: boolean

}