import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    first_name?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    last_name?: string

    @IsString()
    @MinLength(5)
    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty()
    email: string
}
