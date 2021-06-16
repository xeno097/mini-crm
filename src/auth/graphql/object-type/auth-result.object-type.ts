import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthResultType } from 'src/auth/interface/object-type/auth-result-object-type.interface';
import { UserType } from 'src/user/graphql/object-type/user.object-type';

const AuthResultTypeName = 'AuthResult';

@ObjectType(AuthResultTypeName)
export class AuthResultType implements IAuthResultType {
  @Field()
  jwt: string;

  @Field()
  user: UserType;
}
