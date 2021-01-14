import { IsString, IsEmail } from 'class-validator';

class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    public address: string;

    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export default CreateUserDto;
