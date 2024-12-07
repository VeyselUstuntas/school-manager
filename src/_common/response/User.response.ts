import { UserTypes } from "../enums/UserTypes.enum";

export class UserResponse {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    type : UserTypes;
}