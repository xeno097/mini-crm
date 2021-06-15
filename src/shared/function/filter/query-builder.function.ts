import { Model } from 'mongoose';
import { FilterDto } from 'src/shared/dto/filter.dto';

export const queryBuilder = async <T>(
  filterInputDto: FilterDto,
  entityModel: Model<T>,
): Promise<T[]> => {
  console.log(filterInputDto);
  const { limit, start, filter } = filterInputDto;

  const queryBuilder = entityModel.find();

  if (limit) {
    queryBuilder.limit(limit);
  }

  if (start) {
    queryBuilder.skip(start);
  }

  if (filter) {
    queryBuilder.where(filter);
  }

  return await queryBuilder.exec();
};
