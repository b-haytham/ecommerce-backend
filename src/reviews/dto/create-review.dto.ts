import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator"

export class CreateReviewDto {
    @IsMongoId()
    @ApiProperty()
    product_id: string

    @IsMongoId()
    @ApiProperty()
    customer_id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string

    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiProperty()
    rating: number
}
