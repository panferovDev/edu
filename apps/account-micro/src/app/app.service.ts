import { PrismaService } from '@edu/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async getData() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        roleId: true,
        role: true,
      },
    });
    return users;
  }
}
