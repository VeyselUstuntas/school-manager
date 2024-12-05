import { ResponseMessages } from "src/_common/enums/Responsemessages.enum";

export class BaseResponse<T> {
    data: T;
    message: string;
    success: boolean;

    constructor(data: T, message: string, success: boolean,) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}