import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { generateSlug } from 'src/shared/function/generate-slug/generate-slug.function';
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

  static toDto(input: CountryEntity) {
    const { id, name, slug } = input;

    return {
      id,
      name,
      slug,
    };
  }
}

export const CountryEntitySchema = SchemaFactory.createForClass(CountryEntity);

CountryEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  if (this.isModified('name')) {
    this.slug = generateSlug([this.name]);
  }

  next();
});
