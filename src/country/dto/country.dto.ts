import { ICountryDto } from '../interface/dto/country-dto.interface';

export class CountryDto implements ICountryDto {
  id: string;
  name: string;
  slug: string;
}
