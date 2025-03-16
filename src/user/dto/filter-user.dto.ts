import { IsNumber, IsOptional, IsString } from "class-validator"

export class FilterUserDto {
    @IsString()
    @IsOptional()
    regionId?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    shopName?: string

    @IsNumber()
    @IsOptional()
    page?: number
    
    @IsNumber()
    @IsOptional()
    limit?: number
}