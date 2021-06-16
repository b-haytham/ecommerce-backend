import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"


export class LoginUserDto {
    @IsString()
    @MinLength(5)
    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty()
    email: string
}
