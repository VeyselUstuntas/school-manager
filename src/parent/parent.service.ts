import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from 'src/_common/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
    constructor(@InjectRepository(Parent) private readonly parentRepo: Repository<Parent | null>) { }

    async findParentForLogin(emailOrPhone: string, isEmail: boolean): Promise<Parent | null> {
        let parent: Parent | null;
        if (isEmail) {
            parent = await this.parentRepo.findOneBy({ email: emailOrPhone });
        }
        else {
            parent = await this.parentRepo.findOneBy({ phone: emailOrPhone });
        }
        return parent;
    }

    // kayıt için aymı email kontrolü 
    async isEmailAvailable(email: string): Promise<boolean> {
        const parentEmail = await this.parentRepo.exists({ where: { email: email }, withDeleted: true });
        return parentEmail;
    }

    async isPhoneAvailable(phone: string): Promise<boolean> {
        const parentPhone = await this.parentRepo.exists({ where: { phone: phone }, withDeleted: true });
        return parentPhone;
    }

    async createParent(data: { email: string, password: string, phone: string, name: string, lastname: string }): Promise<Parent> {
        const newParent = this.parentRepo.create(data);
        return await this.parentRepo.save(newParent);
    }
}
