import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CourtLocationMapModule } from './modules/court-location-map/court-location-map.module';
import { CourtTypesModule } from './modules/court-types/court-types.module';
import { StatesModule } from './modules/states/states.module';
import { CourtSystemsModule } from './modules/court-systems/court-systems.module';
import { CourtsModule } from './modules/courts/courts.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CoverageModule } from './modules/coverage/coverage.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CourtLocationMapModule,
    CourtTypesModule,
    StatesModule,
    CourtSystemsModule,
    CourtsModule,
    LocationsModule,
    CoverageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
