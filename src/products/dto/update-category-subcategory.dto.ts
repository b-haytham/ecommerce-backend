import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId } from "class-validator"

export class UpdateCateoriesANDSuncategoriesDto {
    @IsMongoId()
    @ApiProperty()
    category_id: string
    
    @IsMongoId()
    @ApiProperty()
    sub_category_id: string
}