import { IJwtPayloadDto } from 'src/auth/interface/dto/jwt-payload-dto.interface';
import { Request, Response } from 'express';

export interface ICustomGqlContext {
  authorization: string;
  jwtPayload: IJwtPayloadDto;
  req: Request;
  res: Response;
}
