import { UserTypes } from "../enums/UserTypes.enum";
import { UserResponse } from "../response/User.response";
import { Parent } from "../typeorm";

export class ParentMapper {
    static toUserDto(parent: Parent): UserResponse {
        const userResponse: UserResponse = new UserResponse();
        userResponse.id = parent.id;
        userResponse.email = parent.email;
        userResponse.phone = parent.phone;
        userResponse.name = parent.name;
        userResponse.lastname = parent.lastname;
        userResponse.type = UserTypes.PARENT;
        return userResponse;
    }
}