import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class UpdateMainInfo {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    display_name: string

    @IsArray()
    @ApiProperty()
    product_details: string[]

    @IsArray()
    @ApiProperty()
    shippment_details: string[]

    @IsArray()
    @ApiProperty()
    other_info: string[]

    @IsNumberString()
    @ApiProperty()
    price: number
}