import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { USER_TYPE } from "../../types/types";

export class CreateUserDto {
    @ApiProperty({ example: "John Doe", description: "User's full name" })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({ example: "johndoe@example.com", description: "User's email address" })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "+998901234567", description: "User's phone number" })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: "StrongP@ssw0rd", description: "User's password (must be strong)" })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "SELLER", description: "User type (BUYER or SELLER)", enum: USER_TYPE })
    @IsEnum(USER_TYPE)
    type: USER_TYPE;

    @ApiProperty({ example: "65f1234abcd5678ef9", description: "User's region ID" })
    @IsString()
    regionId: string;

    @ApiProperty({ example: "My Tech Store", description: "User's shop name" })
    @IsString()
    shopName: string;

    @ApiProperty({ example: "Tashkent, Uzbekistan", description: "User's location" })
    @IsString()
    location: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "User's profile image URL" })
    @IsString()
    image: string;

    @ApiProperty({ example: [], description: "User's comments" })
    comments: string[];

    @ApiProperty({ example: [], description: "User's announcements" })
    announcements: string[];

    @ApiProperty({ example: [], description: "User's orders" })
    orders: string[];
}
