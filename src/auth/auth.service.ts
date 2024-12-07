import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/Login.request.dto';
import { LoginResponse, LoginResponseDto } from './dto/response/Login.response.dto';
import { ParentService } from 'src/parent/parent.service';
import { Parent } from 'src/_common/typeorm';
import bcrypt from "bcrypt";
import { ResponseMessages } from 'src/_common/enums/Responsemessages.enum';
import { BaseResponse } from 'src/_base/response/base.response';

@Injectable()
export class AuthService {

    constructor(@Inject(ParentService) private readonly parentService: ParentService) { }

    async login(data: LoginRequestDto): Promise<LoginResponse> {
        const parent: Parent | null = await this.parentService.findParentForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));
        if (parent && bcrypt.compareSync(data.password, parent.password)) {
            return { accessToken: '', refreshToken: '', user: { name: '', lastName: '', pay: 12 } }
        }
        else {
            throw new NotFoundException(ResponseMessages.PASSWORD_OR_EMAIL_WRONG)
        }
    }

    private isEmail(emailOrPhone: string) {
        return emailOrPhone.includes('@');
    }
}

