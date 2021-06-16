import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class UpdateBrandDto {
    @IsMongoId()
    @ApiProperty()
    brand_id: string
}