import { IsNotEmpty, IsString } from "class-validator"

export class UpdateSubcategoryDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    display_name: string

    @IsString()
    @IsNotEmpty()
    description: string
}
