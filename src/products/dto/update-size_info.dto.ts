import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsOptional } from "class-validator";

export class UpdateSizeInfoDto {
    @IsBoolean()
    @ApiProperty()
    have_size: boolean

    @IsMongoId()
    @IsOptional()
    @ApiProperty()
    size_system?: string

    @IsArray()
    @IsOptional()
    @ApiProperty()
    available_sizes?: string[]
}