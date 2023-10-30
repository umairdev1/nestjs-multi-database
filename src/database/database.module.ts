import { Module } from '@nestjs/common';
import { PgDbService } from './pg-database.service';
import { MySQLDbService } from './mysql-database.service';

@Module({
  providers: [PgDbService, MySQLDbService],
  exports: [PgDbService, MySQLDbService],
})
export class DatabaseModule {}
