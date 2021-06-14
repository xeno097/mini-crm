import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvKey } from './config/enum/env-key.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const db_uri = configService.get<string>(EnvKey.DB_URI);

        return {
          uri: db_uri,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
