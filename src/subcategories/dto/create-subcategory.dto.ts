import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNotEmpty, IsString } from "class-validator"

export class CreateSubcategoryDto {
    
    @IsMongoId()
    @ApiProperty()
    category_id: string

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

}
