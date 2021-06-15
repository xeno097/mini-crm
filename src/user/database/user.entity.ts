import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { UserDto } from '../dto/user.dto';
import { Role } from '../enum/role.enum';
import { IUserEntity } from '../interface/database/user-entity.interface';
import { AddressObject } from './address.object';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class UserEntity extends Document implements IBaseEntity, IUserEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Role.CLIENT, enum: Role })
  role: Role;

  @Prop({ default: false })
  blocked: boolean;

  @Prop({ default: [] })
  addresses: AddressObject[];

  static toDto(input: UserEntity): UserDto {
    const { blocked, email, id, lastName, name, role, addresses } = input;

    return {
      blocked,
      email,
      id,
      lastName,
      name,
      role,
      addresses,
    };
  }
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
