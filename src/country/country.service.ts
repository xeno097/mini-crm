import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  public async getOneCountry(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, CountryDto]> {
    const country = await this.countryRepository.getOneEntity(getOneEntityDto);

    return country;
  }

  public async getCountries(): Promise<[Error, CountryDto[]]> {
    const countries = await this.countryRepository.getEntities();

    return countries;
  }

  public async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<[Error, CountryDto]> {
    const newCountry = await this.countryRepository.createEntity(
      createCountryDto,
    );

    return newCountry;
  }

  public async updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<[Error, CountryDto]> {
    const updatedCountry = await this.countryRepository.updateEntity(
      updateCountryDto,
    );

    return updatedCountry;
  }

  public async deleteOneCountry(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, CountryDto]> {
    const deletedCountry = await this.countryRepository.deleteOneEntity(
      getOneEntityDto,
    );

    return deletedCountry;
  }
}
