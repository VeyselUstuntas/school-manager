import { ResponseMessages } from "src/_common/enums/Responsemessages.enum";

export class BaseResponse<T> {
    data: T;
    message: ResponseMessages;
    success: boolean;

    constructor(data: T, message: ResponseMessages = ResponseMessages.SUCCESS, success: boolean,) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
}