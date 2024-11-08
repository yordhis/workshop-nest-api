import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { UserRoles } from "../types/Roles"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsArray()
    roles: UserRoles[]
    
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