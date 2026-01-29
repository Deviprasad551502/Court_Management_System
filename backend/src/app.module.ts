import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CourtTypesModule } from './modules/court-types/court-types.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CourtTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
