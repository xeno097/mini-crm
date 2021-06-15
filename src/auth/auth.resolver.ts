import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { InputName } from 'src/shared/graphql/enum/input-name.enum';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { Role } from 'src/user/enum/role.enum';
import { UserType } from 'src/user/graphql/object-type/user.object-type';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateCustomerCare } from './graphql/input-type/create-customer-care.input-type';
import { SignInInputType } from './graphql/input-type/sign-in.input-type';
import { SignUpInputType } from './graphql/input-type/sign-up.input-type';
import { UpdateUserPasswordInputType } from './graphql/input-type/update-user-password.input-type';
import { AuthResult } from './graphql/object-type/auth-result.object-type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  public async signUp(
    @Args(InputName.INPUT) input: SignUpInputType,
  ): Promise<AuthResult> {
    const [err, res] = await this.authService.signUp(input);

    if (err) {
      throw err;
    }

    return res;
  }

  @Mutation(() => AuthResult)
  public async signIn(
    @Args(InputName.INPUT) input: SignInInputType,
  ): Promise<AuthResult> {
    const [err, res] = await this.authService.signIn(input);

    if (err) {
      throw err;
    }

    return res;
  }

  @Mutation(() => UserType)
  @UseGuards(GqlAuthGuard)
  @AuthorizedRoles(Role.ADMIN)
  public async createCustomerCare(
    @Args(InputName.INPUT) input: CreateCustomerCare,
  ): Promise<UserType> {
    const [err, res] = await this.authService.createCustomerCare(input);

    if (err) {
      throw err;
    }

    return res;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  public async updatePassword(
    @Args(InputName.INPUT) input: UpdateUserPasswordInputType,
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<boolean> {
    const { oldPassword, password } = input;
    const { email } = jwtPayloadDto;

    const updateAuthInput: UpdateAuthDto = {
      getOneEntityDto: {
        email,
      },
      updateEntityPayload: {
        password,
        oldPassword,
      },
    };

    const [err, res] = await this.authService.updateAuth(updateAuthInput);

    if (err) {
      throw err;
    }

    return res;
  }
}
