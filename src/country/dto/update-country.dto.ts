import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateCountryPayloadDto } from './update-country-payload.dto';

export class UpdateCountryDto implements IUpdateEntityDto {
  getOneEntityDto: Record<string, any>;
  updateEntityPayload: UpdateCountryPayloadDto;
}
