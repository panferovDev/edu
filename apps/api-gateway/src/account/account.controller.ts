import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AccountSignupContract } from '@edu/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Controller('account')
export class AccountController {
  constructor(@Inject('ACCOUNT_SERVICE') private client: ClientProxy) {}

  @Get()
  async index() {
    try {
      const response = await firstValueFrom(
        this.client.send('hello', { id: 1 }).pipe(timeout(2000))
      );
      return response;
    } catch (error) {
      console.log(error);
    }
    return { message: 'Hello!' };
  }

  @Post('signup')
  async signUp(@Body() dto: AccountSignupContract.Request):Promise<AccountSignupContract.Response> {
    try {
      const response = await firstValueFrom<AccountSignupContract.Response>(
        this.client.send(AccountSignupContract.pattern, dto).pipe(timeout(3000))
      );
      return response;
    } catch (err) {
      throw new HttpException('gateway timeout', HttpStatus.GATEWAY_TIMEOUT);
    }
  }
}
