import { IFilterDto } from '../interfaces/filter-dto.interface';

export class FilterDto implements IFilterDto {
  start?: number;
  limit?: number;
  filter?: Record<string, any>;
}
