import { Args, Resolver, Query, Context ,Mutation} from '@nestjs/graphql';
import { Server } from './types';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';
import { CreateServerDto } from './server.sto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdir, mkdirSync } from 'fs';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(
    @Args('profileId') profileId: number,
    @Context() ctx: { req: Request },
  ) {
    if (ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    return await this.serverService.getServersByProfileEmailOfMember(
      ctx.req?.profile.email,
    );
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    let imageUrl;
    if(file){
      imageUrl= await this.storeImageAndGetUrl(file)
    }
    return this.serverService.createServer(input,imageUrl)
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

    if(!existsSync(join(process.cwd(), "public",'images'))){
      mkdirSync(join(process.cwd(), "public",'images'),{recursive: true})
    }
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl
  }
}
