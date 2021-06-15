import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { IAuthEntity } from '../interface/database/auth-entity.interface';

@Schema({
  collection: 'auth',
  timestamps: true,
})
export class AuthEntity extends Document implements IBaseEntity, IAuthEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthEntitySchema = SchemaFactory.createForClass(AuthEntity);

AuthEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
