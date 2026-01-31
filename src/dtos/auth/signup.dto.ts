import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../entity/user';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;

    @IsString()
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
