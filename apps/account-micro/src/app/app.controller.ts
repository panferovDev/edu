import { Controller } from '@nestjs/common';
import { AccountSignupContract } from '@edu/contracts';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(AccountSignupContract.pattern)
  async signUp(request: AccountSignupContract.Request) {
    console.log('----', request);
    return { hello: '123' };
  }
}
