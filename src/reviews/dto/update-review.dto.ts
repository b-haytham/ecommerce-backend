import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class UpdateReviewDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number
}
