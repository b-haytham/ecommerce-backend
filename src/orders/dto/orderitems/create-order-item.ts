import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateOrderItemDto{
    @IsMongoId()
    @ApiProperty()
    product_id: string
    
    @IsNumber()
    @Min(1)
    @ApiProperty()
    quantity: number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    size?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    color?: string
}