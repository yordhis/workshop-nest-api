import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content?: string

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    isPublished?: boolean

}