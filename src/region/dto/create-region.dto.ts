import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({example: "Toshkent", description: "Region name"})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: ["user1_id", "user2_id"]})
    users: string[]
}
  