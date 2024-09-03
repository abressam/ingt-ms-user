import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;   

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;   

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    birthdate: string;

    @ApiProperty()
    @IsString()
    crp: string;
}