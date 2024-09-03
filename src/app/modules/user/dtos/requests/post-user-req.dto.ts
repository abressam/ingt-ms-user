import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PostUserReqDto {
    @ApiProperty({ required: true })
    @IsString()
    cpfCnpj: string;

    @ApiProperty({ required: true })
    @IsString()
    name: string;
  
    @ApiProperty({ required: true })
    @IsString()
    address: string;
  
    @ApiProperty({ required: true })
    @IsString()
    phone: string;
  
    @ApiProperty({ required: true })
    @IsString()
    email: string;

    @ApiProperty({ required: true })
    @IsString()
    birthdate: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    crp: string | null;
  
    @ApiProperty({ required: true })
    @IsString()
    password: string;
}