import { IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateOrderItemDto{
    @IsMongoId()
    product_id: string
    
    @IsNumber()
    @Min(1)
    quantity: number

    @IsOptional()
    @IsString()
    size?: string

    @IsOptional()
    @IsString()
    color?: string
}