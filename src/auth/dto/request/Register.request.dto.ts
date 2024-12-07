import { IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength, } from "class-validator";
import { UserTypes } from "src/_common/enums/UserTypes.enum";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/validationMessage.enum";

export class RegisterRequestDto {

    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MAX_LENGTH, 50) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MIN_LENGTH, 6) })
    @IsString({ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.IS_NOT_EMPTY) })
    email: string;

    @MaxLength(15, { message: getValidationMessage(DtoPrefix.PHONE, ValidationType.MAX_LENGTH, 15) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PHONE, ValidationType.MIN_LENGTH, 6) })
    @IsString({ message: getValidationMessage(DtoPrefix.PHONE, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.PHONE, ValidationType.IS_NOT_EMPTY) })
    phone: string;

    @MaxLength(50, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MAX_LENGTH, 50) })
    @MinLength(2, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MIN_LENGTH, 2) })
    @IsString({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.IS_NOT_EMPTY) })
    name: string;

    @MaxLength(50, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 50) })
    @MinLength(2, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MIN_LENGTH, 2) })
    @IsString({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.IS_NOT_EMPTY) })
    lastname: string;

    @MaxLength(50, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MAX_LENGTH, 50) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MIN_LENGTH, 6) })
    @IsStrongPassword({}, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    @IsString({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.IS_NOT_EMPTY) })
    password: string;

    @IsEnum(UserTypes, { message: getValidationMessage(DtoPrefix.USER_TYPE, ValidationType.NOT_VALID) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.USER_TYPE, ValidationType.IS_NOT_EMPTY) })
    userType: UserTypes;

}