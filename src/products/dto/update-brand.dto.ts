import { IsMongoId } from "class-validator";

export class UpdateBrandDto {
    @IsMongoId()
    brand_id: string
}