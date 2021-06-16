import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator"

export class CreateReviewDto {
    @IsMongoId()
    product_id: string

    @IsMongoId()
    customer_id: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number
}
