import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CourtTypesModule } from './modules/court-types/court-types.module';
import { CourtSystemsModule } from './modules/court-systems/court-systems.module';
import { CourtsModule } from './modules/courts/courts.module';
import { StatesModule } from './modules/states/states.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CourtLocationMapModule } from './modules/court-location-map/court-location-map.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CourtTypesModule, CourtSystemsModule,CourtsModule,
    StatesModule,
    LocationsModule,
    CourtLocationMapModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
