import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsString } from "class-validator"

export class UpdateProductDto {
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

    @IsNumberString()
    count: number

    @IsMongoId()
    brand_id: string

    @IsMongoId()
    category_id: string

    @IsMongoId()
    sub_category_id: string

    @IsNotEmptyObject()
    size_info: {
        have_size: boolean
        size_system?: string
        available_sizes?: string[]
    }

    @IsNotEmptyObject()
    color_info: {
        have_color: boolean
        available_colors?: {name: string, hex_code: string}[]
    }
}
