import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsObject, IsOptional } from "class-validator";

export class UpdateColorInfoDto {
    @IsBoolean()
    @ApiProperty()
    have_color: boolean

    @IsArray()
    @IsOptional()
    @ApiProperty()
    available_colors?: {name: string, hex_code: string}[]
} 