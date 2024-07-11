import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {User} from "../../user/entities/user.entity";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsOptional()
    user?: User
}
