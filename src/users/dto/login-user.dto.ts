import { IsEmail, IsString, MinLength } from "class-validator"


export class LoginUserDto {
    @IsString()
    @MinLength(5)
    password: string

    @IsEmail()
    email: string
}
