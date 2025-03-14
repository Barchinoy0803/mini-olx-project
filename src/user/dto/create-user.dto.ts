import { IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { USER_TYPE } from "src/types/types"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string

    @IsEnum(USER_TYPE)
    type: USER_TYPE

    @IsString()
    regionId: string

    @IsString()
    shopName: string

    @IsString()
    location: string

    @IsString()
    image: string
}
