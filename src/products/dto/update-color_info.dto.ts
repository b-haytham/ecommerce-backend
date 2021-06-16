import { IsArray, IsBoolean, IsObject, IsOptional } from "class-validator";

export class UpdateColorInfoDto {
    @IsBoolean()
    have_color: boolean

    @IsArray()
    @IsOptional()
    available_colors?: {name: string, hex_code: string}[]
} 