import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { Role } from '../enum/role.enum';
import { IUserEntity } from '../interface/database/user-entity.interface';

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
}

const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
