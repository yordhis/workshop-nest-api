import { IsEmail, IsEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsEmpty()
    username: string
    
    @IsString()
    @IsEmpty()
    name: string

    @IsString()
    @IsEmpty()
    lastname: string

    @IsEmail()
    @IsEmpty()
    email: string

    @IsNumber()
    @IsEmpty()
    age:string
}