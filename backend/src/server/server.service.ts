import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServerDto } from './server.sto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(input: CreateServerDto, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: input.profileId },
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.prisma.server.create({
      data: {
        ...input,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
  }
}
