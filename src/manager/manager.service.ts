import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/_common/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(@InjectRepository(Manager) private readonly managerRepo: Repository<Manager | null>) { }

    async findManagerForLogin(emailOrPhone: string, isEmail: boolean): Promise<Manager | null> {
        let manager: Manager;
        if (isEmail) {
            manager = await this.managerRepo.findOneBy({ email: emailOrPhone });
        }
        else {
            manager = await this.managerRepo.findOneBy({ phone: emailOrPhone });
        }

        return manager;
    }

    async isAvailableEmail(email: string): Promise<boolean> {
        const managerEmail = await this.managerRepo.exists({ where: { email: email }, withDeleted: true });
        return managerEmail;
    }

    async isAvailablePhone(phone: string): Promise<boolean> {
        const managerPhone = await this.managerRepo.exists({ where: { phone: phone }, withDeleted: true });
        return managerPhone;

    }

    async createManager(data: { email: string, password: string, phone: string, name: string, lastname: string }): Promise<Manager> {
        const newManager = this.managerRepo.create(data);
        return await this.managerRepo.save(newManager);
    }
}
