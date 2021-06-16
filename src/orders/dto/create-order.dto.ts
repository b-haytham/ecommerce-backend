import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"



class OrderItem {
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

export class CreateOrderDto {    
    @IsArray()
    @ApiProperty({type: [OrderItem]})
    order_items: OrderItem[]

    @IsMongoId()
    @ApiProperty()
    customer_id: string
}


