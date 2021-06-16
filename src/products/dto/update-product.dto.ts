import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsString } from "class-validator"

export class UpdateProductDto {
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

    @IsNumberString()
    @ApiProperty()
    count: number

    @IsMongoId()
    @ApiProperty()
    brand_id: string

    @IsMongoId()
    @ApiProperty()
    category_id: string

    @IsMongoId()
    @ApiProperty()
    sub_category_id: string

    @IsNotEmptyObject()
    @ApiProperty()
    size_info: {
        have_size: boolean
        size_system?: string
        available_sizes?: string[]
    }

    @IsNotEmptyObject()
    @ApiProperty()
    color_info: {
        have_color: boolean
        available_colors?: {name: string, hex_code: string}[]
    }
}
