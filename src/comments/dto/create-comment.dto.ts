import { IsMongoId, IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
    @IsMongoId()
    product_id: string

    @IsMongoId()
    customer_id: string

    @IsString()
    @IsNotEmpty()
    content: string
}
