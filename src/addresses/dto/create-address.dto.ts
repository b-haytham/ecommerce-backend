import { IsMongoId, IsNumber, IsString, MinLength } from "class-validator"

export class CreateAddressDto {
    @IsMongoId({})
    user_id: string

    @IsString()
    @MinLength(4)
    street: string


    @IsString()
    @MinLength(3)
    city: string

    @IsString()
    @MinLength(3)
    state: string

    @IsNumber()
    zip_code: number

    @IsString()
    @MinLength(8)
    phone_number: string
}
