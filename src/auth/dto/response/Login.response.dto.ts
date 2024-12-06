import { BaseResponse } from "src/_base/response/base.response";
import { EmployeeResponse } from "src/_common/response/Employee.response";

class LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: EmployeeResponse

}

export class LoginResponseDto extends BaseResponse<LoginResponse> {
    data: LoginResponse;
    message: string;
    success: boolean;
}