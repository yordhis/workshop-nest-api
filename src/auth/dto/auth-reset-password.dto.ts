import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthResetPassDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}