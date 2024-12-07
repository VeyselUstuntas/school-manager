import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/Login.request.dto';
import { Response } from 'express';
import { LoginResponse, LoginResponseDto } from './dto/response/Login.response.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/Responsemessages.enum';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequestDto, @Res() res: Response<LoginResponseDto>): Promise<void> {
        try {
            const data: LoginResponse = await this.authService.login(body);
            res.json(new BaseResponse(data, ResponseMessages.SUCCESS, true));
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    @Post('regiser')
    register(@Body() body: any) {

    }

    @Post('logout')
    logout() {

    }

    @Post('refresh-token')
    refreshToken(@Body() body: any) {

    }
}
