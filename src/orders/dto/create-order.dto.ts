import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateOrderDto {    
    @IsArray()
    order_items: OrderItem[]

    @IsMongoId()
    customer_id: string
}


class OrderItem {
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
