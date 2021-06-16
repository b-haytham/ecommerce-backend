import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class UpdateReviewDto {
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
