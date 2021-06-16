import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNumber, IsString, MinLength } from "class-validator"

export class UpdateAddressDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    street: string

    @IsString()
    @MinLength(3)
    @ApiProperty()
    city: string

    @IsString()
    @MinLength(3)
    @ApiProperty()
    state: string

    @IsNumber()
    @ApiProperty()
    zip_code: number

    @IsString()
    @MinLength(8)
    @ApiProperty()
    phone_number: string
}
