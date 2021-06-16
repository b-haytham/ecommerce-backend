import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsPositive } from "class-validator";

export class UpdateCountDto {
    @IsNumberString()
    @ApiProperty()
    count:number
}