import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
    @IsMongoId()
    @ApiProperty()
    product_id: string

    @IsMongoId()
    @ApiProperty()
    customer_id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string
}
