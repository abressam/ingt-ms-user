import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class PostUserReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cpfCnpj: string;

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
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    birthdate: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    crp: string | null;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}