import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { idFieldOptions } from 'src/shared/graphql/constants.graphql';
import { InputName } from 'src/shared/graphql/enum/input-name.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserInputType } from './graphql/input-type/create-user.input-type';
import { UpdateUserInputType } from './graphql/input-type/update-user.input-type';
import { UserType } from './graphql/object-type/user.object-type';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  public async getUserById(
    @Args(InputName.ID, idFieldOptions) id: string,
  ): Promise<UserType> {
    const [err, user] = await this.userService.getOneUser({ id });

    if (err) {
      throw err;
    }

    return user;
  }

  @Query(() => [UserType])
  public async getUsers(): Promise<UserType[]> {
    const [err, users] = await this.userService.getUsers();

    if (err) {
      throw err;
    }

    return users;
  }

  @Mutation(() => UserType)
  public async createUser(
    @Args(InputName.INPUT) input: CreateUserInputType,
  ): Promise<UserType> {
    const [err, user] = await this.userService.createUser(input);

    if (err) {
      throw err;
    }

    return user;
  }

  @Mutation(() => UserType)
  public async updateUser(
    @Args(InputName.INPUT) input: UpdateUserInputType,
  ): Promise<UserType> {
    const { where, payload } = input;

    const updateUserDto: UpdateUserDto = {
      getOneEntityDto: where,
      updateEntityPayload: payload,
    };

    const [err, user] = await this.userService.updateUser(updateUserDto);

    if (err) {
      throw err;
    }

    return user;
  }

  @Mutation(() => UserType)
  public async deleteUserById(
    @Args(InputName.ID, idFieldOptions) id: string,
  ): Promise<UserType> {
    const [err, user] = await this.userService.deleteOneUser({ id });

    if (err) {
      throw err;
    }

    return user;
  }
}
