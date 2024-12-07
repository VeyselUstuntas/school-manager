import { UserResponse } from "../response/User.response";
import { Manager } from "../typeorm";

export class ManagerMapper{
    static toUserDto(manager: Manager): UserResponse{
        const userResponse: UserResponse = new UserResponse();
        userResponse.id = manager.id;
        userResponse.email = manager.email;
        userResponse.phone = manager.phone;
        userResponse.name = manager.name;
        userResponse.lastname = manager.lastname;
        return userResponse;
    }
}