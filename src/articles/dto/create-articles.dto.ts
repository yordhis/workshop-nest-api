import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    description: string

}