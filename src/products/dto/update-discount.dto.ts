import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";


export class UpdateDiscountDto {
    @IsBoolean()
    have_discount: boolean

    @IsNumber()
    @IsPositive()
    @IsOptional()
    discount_percentage?: number
}