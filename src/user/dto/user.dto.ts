import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsAlpha,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Permissions {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export class UserProfileDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio: string;
}

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uid: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
