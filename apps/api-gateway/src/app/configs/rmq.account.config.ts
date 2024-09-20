import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';

export const getAccountConfig = (): ClientsProviderAsyncOptions => ({
  name: 'ACCOUNT_SERVICE',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): RmqOptions => ({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBIT_URL')],
      queue: configService.get<string>('ACCOUNT_QUEUE'),
      queueOptions: {
        durable: false,
      },
    },
  }),
});
