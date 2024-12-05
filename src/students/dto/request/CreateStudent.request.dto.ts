import { IsNotEmpty, IsNumber, IsOptional, isValidationOptions, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/validationMessage.enum";

export class CreateStudentRequestDto {
    @MaxLength(20, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MAX_LENGTH, 20) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.IS_NOT_EMPTY) })
    name: string;

    @MaxLength(20, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 20) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.IS_NOT_EMPTY) })
    lastName: string;

    @IsNumber({},{message:getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.MUST_BE_NUMBER)})
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.IS_NOT_EMPTY)})
    identityNumber: number;

}