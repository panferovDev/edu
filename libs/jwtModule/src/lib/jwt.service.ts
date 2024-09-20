import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountSignupContract } from '@edu/contracts';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private accessSecret: string;
  private refreshSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.accessSecret =
      this.configService.get<string>('ACCESS_SECRET') || 'fkdl;sfk';
    this.refreshSecret =
      this.configService.get<string>('REFRESH_SECRET') || 'fdskjfcn';
  }
  generateTokens(
    userData: Omit<AccountSignupContract.Response, 'accessToken'>
  ) {
    return {
      access: jwt.sign(userData, this.accessSecret, { expiresIn: '15m' }),
      refresh: jwt.sign(userData, this.refreshSecret, { expiresIn: '7d' }),
    };
  }

  validaAccess(token: string) {
    return jwt.verify(token, this.accessSecret);
  }

  validateRefresh(token: string) {
    return jwt.verify(token, this.refreshSecret);
  }
}
