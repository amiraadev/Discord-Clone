import { Args, Resolver, Query, Context, Mutation } from '@nestjs/graphql';
import { Server } from './types';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';
import {
  CreateChannelOnServerDto,
  CreateServerDto,
  UpdateServerDto,
} from './server.sto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { MemberRole } from 'src/member/member.types';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: Request }) {
    console.log({ profile: ctx.req?.profile });

    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    return await this.serverService.getServersByProfileEmailOfMember(
      ctx.req?.profile.email,
    );
  }
  @Query(() => Server)
  async getServer(
    @Context() ctx: { req: Request },
    @Args('id', { nullable: true }) id: number,
  ) {
    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    return await this.serverService.getServer(id, ctx.req?.profile.email);
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    // let imageUrl;
    // if (file) {
    //   imageUrl = await this.storeImageAndGetUrl(file);
    // }
    if (!file) throw new ApolloError('Image is required', 'IMAGE_REQUIRED');
    const imageUrl = await this.storeImageAndGetUrl(file);
    return this.serverService.createServer(input, imageUrl);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }

  @Mutation(() => Server)
  async updateServer(
    @Args('input') input: UpdateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    let imageUrl;

    if (file) {
      imageUrl = await this.storeImageAndGetUrl(file);
    }

    try {
      return this.serverService.updateServer(input, imageUrl);
    } catch (error) {
      throw new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => Server)
  async updateServerWithNewInviteCode(
    @Args('serverId', { nullable: true }) serverId: number,
  ) {
    if (!serverId)
      throw new ApolloError('Server id is required', 'SERVER_ID_REQUIRED');
    try {
      return this.serverService.updateServerWithNewInviteCode(serverId);
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation(() => Server)
  async createChannel(
    @Args('input') input: CreateChannelOnServerDto,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.createChannel(input, ctx.req?.profile.email);
    } catch (error) {
      throw new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => Server)
  async leaveServer(
    @Args('serverId') serverId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      await this.serverService.leaveServer(serverId, ctx.req?.profile.email);
      return 'Successfully left the server!';
    } catch (error) {
      throw new ApolloError(error.message, error.code);
    }
  }
  @Mutation(() => String)
  async deleteServer(
    @Args('serverId') serverId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.deleteServer(serverId, ctx.req?.profile.email);
    } catch (error) {
      throw new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => String)
  async deleteChannelFromServer(
    @Args('channelId', { nullable: true }) channelId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.deleteChannelFromServer(
        channelId,
        ctx.req?.profile.email,
      );
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }

  @Mutation(() => Server)
  async addMemberToServer(
    @Args('inviteCode') inviteCode: string,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.addMemberToServer(
        inviteCode,
        ctx.req?.profile.email,
      );
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }

  @Mutation(() => Server)
  async changeMemberRole(
    @Args('memberId', { nullable: true }) memberId: number,
    @Args('role') role: MemberRole,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.changeMemberRole(
        memberId,
        role,
        ctx.req?.profile.email,
      );
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }

  @Mutation(() => Server)
  async deleteMember(
    @Args('memberId', { nullable: true }) memberId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.deleteMember(memberId, ctx.req?.profile.email);
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }
}
