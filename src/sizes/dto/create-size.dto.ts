import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateSizeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    display_name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsArray()
    @ApiProperty()
    size_list: string[]
}
