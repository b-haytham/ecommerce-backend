import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    first_name?: string
    last_name?: string

    @IsString()
    @MinLength(5)
    password: string

    @IsEmail()
    email: string
}
