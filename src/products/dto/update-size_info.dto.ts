import { IsArray, IsBoolean, IsMongoId, IsOptional } from "class-validator";

export class UpdateSizeInfoDto {
    @IsBoolean()
    have_size: boolean

    @IsMongoId()
    @IsOptional()
    size_system?: string

    @IsArray()
    @IsOptional()
    available_sizes?: string[]
}