import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { ICountryEntity } from '../interface/database/country-entity.interface';

@Schema({
  collection: 'country',
  timestamps: true,
})
export class CountryEntity extends Document
  implements IBaseEntity, ICountryEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;
}

export const CountryEntitySchema = SchemaFactory.createForClass(CountryEntity);

CountryEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
