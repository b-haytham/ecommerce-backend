import { IsArray, IsNotEmpty, IsString } from "class-validator"


export class UpdateSizeDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    display_name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsArray()
    size_list: string[]
}
