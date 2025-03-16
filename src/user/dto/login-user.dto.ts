import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class LoginUserDto {
    @ApiProperty({ example: "johndoe@example.com", description: "User's email address" })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: "StrongP@ssw0rd", description: "User's password (must be strong)" })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}