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
}