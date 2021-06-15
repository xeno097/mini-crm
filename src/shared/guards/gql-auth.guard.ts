import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { Role } from 'src/user/enum/role.enum';
import { AUTHORIZED_ROLES_KEY } from '../decorators/authorized-roles.decorator';
import { getCustomGqlContext } from '../graphql/utils/get-custom-gql-context.util';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const customGqlContext = getCustomGqlContext(context);

      const { authorization } = customGqlContext;

      const jwtPayload: JwtPayloadDto = this.jwtService.verify(authorization);

      customGqlContext.jwtPayload = jwtPayload;

      const authorized = this.verifyUserRole(jwtPayload, context);

      if (!authorized) {
        throw new Error('Unauthorized');
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new Error('Unauthorized');
    }
  }

  private verifyUserRole(
    jwtPayload: JwtPayloadDto,
    context: ExecutionContext,
  ): boolean {
    const authorizedRoles = this.reflector.getAllAndOverride<Role[]>(
      AUTHORIZED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!authorizedRoles) {
      return true;
    }

    const { role } = jwtPayload;

    const [authorizedRole] = authorizedRoles.filter(authorizedRole => {
      return role === authorizedRole;
    });

    return !!authorizedRole;
  }
}
