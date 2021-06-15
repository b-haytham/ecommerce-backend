import { IsMongoId, IsNotEmpty, IsString } from "class-validator"

export class CreateSubcategoryDto {
    
    @IsMongoId()
    category_id: string

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
