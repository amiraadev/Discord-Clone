import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { Profile } from './profile.types';
import { CreateProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }

  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: number){
    return this.profileService.getProfileById(profileId);
  }

  @Query(() => Profile)
  async getProfileByEmail(@Args('email') email: string){
    return this.profileService.getProfileByEmail(email);
  }

}
