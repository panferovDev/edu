import { IsEmail, IsString } from 'class-validator';

export namespace AccountSignupContract {
  export const pattern = 'account.signup';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
  }

  export class Response {
    id: string;
    name: string;
    role: {
      id: number;
      name: string;
    };
    accessToken: string;
  }
}
