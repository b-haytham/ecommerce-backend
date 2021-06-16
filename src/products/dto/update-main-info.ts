import { IsArray, IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class UpdateMainInfo {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    display_name: string

    @IsArray()
    product_details: string[]

    @IsArray()
    shippment_details: string[]

    @IsArray()
    other_info: string[]

    @IsNumberString()
    price: number
}