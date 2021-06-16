import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";


export class UpdateDiscountDto {
    @IsBoolean()
    @ApiProperty()
    have_discount: boolean

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @ApiProperty()
    discount_percentage?: number
}