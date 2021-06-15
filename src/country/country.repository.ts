import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterDto } from 'src/shared/dto/filter.dto';
import { queryBuilder } from 'src/shared/function/filter/query-builder.function';
import { CountryEntity } from './database/country.entity';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryRepository {
  constructor(
    @InjectModel(CountryEntity.name)
    private readonly countryModel: Model<CountryEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<CountryEntity> {
    const entity = await this.countryModel.findOne(getOneEntityDto);

    if (!entity) {
      throw new Error('Country not found');
    }

    return entity;
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, CountryDto]> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto);

      const res = CountryEntity.toDto(entity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(
    filterDto: FilterDto,
  ): Promise<[Error, CountryDto[]]> {
    try {
      const entities = await queryBuilder(filterDto, this.countryModel);

      const res: CountryDto[] = entities.map(entity => {
        return CountryEntity.toDto(entity);
      });

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateCountryDto,
  ): Promise<[Error, CountryDto]> {
    try {
      const newEntity = new this.countryModel(createEntityDto);

      await newEntity.save();

      const res = CountryEntity.toDto(newEntity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateCountryDto,
  ): Promise<[Error, CountryDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save({ validateBeforeSave: true });

      const res = CountryEntity.toDto(entityToUpdate);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, CountryDto]> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto);

      await entity.delete();

      const res = CountryEntity.toDto(entity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }
}
