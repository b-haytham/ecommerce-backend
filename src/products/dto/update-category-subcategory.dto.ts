import { IsMongoId } from "class-validator"

export class UpdateCateoriesANDSuncategoriesDto {
    @IsMongoId()
    category_id: string
    
    @IsMongoId()
    sub_category_id: string
}