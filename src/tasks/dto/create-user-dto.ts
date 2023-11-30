import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    city : string;

    @IsNotEmpty()
    phone_no: string;

    @IsNotEmpty()
    aadhaar: string;
    
}