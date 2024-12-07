import { BadGatewayException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/Login.request.dto';
import { LoginResponse, LoginResponseDto } from './dto/response/Login.response.dto';
import { ParentService } from 'src/parent/parent.service';
import { Parent } from 'src/_common/typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseMessages } from 'src/_common/enums/Responsemessages.enum';
import { RegisterRequestDto } from './dto/request/Register.request.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/_common/payloads/Jwt.payload';

@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => ParentService)) private readonly parentService: ParentService, private readonly jwtService: JwtService) { }

    async login(data: LoginRequestDto): Promise<{ user: any, accessToken: string, refreshToken: string }> {
        const parent: Parent | null = await this.parentService.findParentForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));
        if (parent && bcrypt.compareSync(data.password, parent.password)) {
            const payload: JwtPayload = { "email": parent.email, "phone": parent.phone, "name": parent.name, "lastname": parent.lastname, "id": parent.id };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
            return {
                user: parent,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        }
        else {
            throw new NotFoundException(ResponseMessages.PASSWORD_OR_EMAIL_WRONG)
        }
    }

    async register(body: RegisterRequestDto): Promise<{ user: any, accessToken: string, refreshToken: string }> {
        const isAvailable = await this.isAvailableForRegister(body);

        if (isAvailable) {
            if (body.userType === UserTypes.PARENT) {
                const hashedPassword = await bcrypt.hash(body.password, 10);
                const parent = await this.parentService.createParent({ ...body, password: hashedPassword });
                const payload: JwtPayload = { "email": parent.email, "phone": parent.phone, "name": parent.name, "lastname": parent.lastname, "id": parent.id };
                const accessToken = this.jwtService.sign(payload);
                const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
                return {
                    user: parent,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                };
            }
            else {
                //manager için 
            }

        }
    }

    private isEmail(emailOrPhone: string) {
        return emailOrPhone.includes('@');
    }

    private async isAvailableForRegister(body: RegisterRequestDto) {
        if (body.userType === UserTypes.PARENT) {
            const isEmailAvailableForParent = await this.parentService.isEmailAvailable(body.email);
            const isPhoneAvailableForParent = await this.parentService.isPhoneAvailable(body.phone);
            if (isEmailAvailableForParent)
                throw new BadGatewayException(ResponseMessages.EMAIL_ALREADY_EXISTS);
            else if (isPhoneAvailableForParent)
                throw new BadGatewayException(ResponseMessages.PHONE_ALREADY_EXISTS);
            return true;
        }
        else {
            //TODO manager için kontrol
        }
    }
}

