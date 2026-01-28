import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions} from './config/typeorm.config';
import { CourtTypesModule } from './court-types/court-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CourtTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
