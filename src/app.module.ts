import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvKey } from './config/enum/env-key.enum';
import { validateConfig } from './config/validate/validate.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { formatExpressGraphqlCtx } from './shared/graphql/utils/format-graphql-ctx.util';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: validateConfig,
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
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: formatExpressGraphqlCtx,
    }),
    UserModule,
    AuthModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
