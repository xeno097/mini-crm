import * as joi from 'joi';
import { EnvKey } from '../enum/env-key.enum';

const configSchema = joi
  .object<Record<EnvKey, any>>({
    DB_URI: joi.string().required(),
    PORT: joi.number().greater(0),
    ACCESS_TOKEN_EXP: joi.string().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
  })
  .unknown(true);

export const validateConfig = (config: Record<string, any>) => {
  const { error } = configSchema.validate(config, { abortEarly: false });

  if (error) {
    throw new Error(error.message);
  }

  return config;
};
