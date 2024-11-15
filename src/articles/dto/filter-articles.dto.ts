import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class FilterArticleDto {
    @IsNumber()
    @IsOptional()
    filterForAuthor: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    filterForMessage: string
    
}