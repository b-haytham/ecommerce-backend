import { IsNumberString, IsPositive } from "class-validator";

export class UpdateCountDto {
    @IsNumberString()
    count:number
}