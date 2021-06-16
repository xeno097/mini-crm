import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUserType } from 'src/user/interface/object-type/user-object-type.interface';
import { AddressType } from './address.object-type';

const UserTypeName = 'User';

@ObjectType(UserTypeName)
export class UserType implements IUserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => [AddressType])
  addresses: AddressType[];
}
