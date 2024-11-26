import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @IsNotEmpty()
    age:number
}