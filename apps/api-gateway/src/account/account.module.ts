import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { getAccountConfig } from '../app/configs/rmq.account.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
    imports:[
        ClientsModule.registerAsync([getAccountConfig()]),
        
    ],
    controllers:[AccountController],
})
export class AccountModule {}