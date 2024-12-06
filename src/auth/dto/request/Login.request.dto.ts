import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/validationMessage.enum";

export class LoginRequestDto {

    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MAX_LENGTH, 50) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MIN_LENGTH, 6) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.IS_NOT_EMPTY) })
    emailOrPhone: string;


    @IsStrongPassword({}, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    @IsString({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MUST_BE_STRING) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MAX_LENGTH, 50) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MIN_LENGTH, 6) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.IS_NOT_EMPTY) })
    password: string;


}