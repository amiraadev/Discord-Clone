import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ServerModule } from './server/server.module';
import { MemberModule } from './member/member.module';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..',"public"),
      serveRoot:'/'
    }),
    GraphQLModule.forRootAsync({
      imports:[],
      inject:[],
      driver:ApolloDriver,
      useFactory:async() =>{
        playground:true;
        return {
          autoSchemaFile:join(process.cwd(),'src/schema.gql'),
          sortSchema:true,
          subscriptions:{}
        }
      }
    }),
    ServerModule,
    MemberModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService, ProfileResolver, ProfileService],
})
export class AppModule {}
