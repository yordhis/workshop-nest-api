import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { UserRoles } from "../types/Roles"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsArray()
    roles: UserRoles[]
}