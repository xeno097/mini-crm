import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import {
  filterInputOptions,
  idFieldOptions,
} from 'src/shared/graphql/constants.graphql';
import { InputName } from 'src/shared/graphql/enum/input-name.enum';
import { FilterInput } from 'src/shared/graphql/input-type/filter.input-type';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { Role } from './enum/role.enum';
import { UpdateUserInputType } from './graphql/input-type/user/update-user.input-type';
import { UserType } from './graphql/object-type/user.object-type';
import { UserService } from './user.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  @AuthorizedRoles(Role.ADMIN, Role.CUSTOMER_CARE)
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
  @AuthorizedRoles(Role.ADMIN, Role.CUSTOMER_CARE)
  public async getUsers(
    @Args(InputName.INPUT, filterInputOptions) input: FilterInput,
  ): Promise<UserType[]> {
    const [err, users] = await this.userService.getUsers(input);

    if (err) {
      throw err;
    }

    return users;
  }

  @Mutation(() => UserType)
  @AuthorizedRoles(Role.ADMIN)
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
  @AuthorizedRoles(Role.ADMIN)
  public async deleteUserById(
    @Args(InputName.ID, idFieldOptions) id: string,
  ): Promise<UserType> {
    const [err, user] = await this.userService.deleteOneUser({ id });

    if (err) {
      throw err;
    }

    return user;
  }

  // Business Logic
  @Query(() => [UserType])
  @AuthorizedRoles(Role.ADMIN, Role.CUSTOMER_CARE)
  public async getClients(
    @Args(InputName.INPUT, filterInputOptions) input: FilterInput,
  ): Promise<UserType[]> {
    const [err, users] = await this.userService.getClients(input);

    if (err) {
      throw err;
    }

    return users;
  }
}
