export enum DtoPrefix {
    NAME = 'NAME',
    LASTNAME = 'LASTNAME',
    IDENTITY_NUMBER = 'IDENTITY_NUMBER'
}


export enum ValidationType {
    IS_NOT_EMPTY = 'IS_NOT_EMPTY',
    MUST_BE_NUMBER = 'MUST_BE_NUMBER',
    MUST_BE_STRING = 'MUST_BE_STRING',
    MAX_LENGTH = 'MAX_LENGTH',
}

export function getValidationMessage(prefix: DtoPrefix, validationType: ValidationType, ...args: any): string {
    const message = `${prefix}_${validationType}${args.length > 0 ? '|' + args.join('|') : ''}`;
    return message;
}