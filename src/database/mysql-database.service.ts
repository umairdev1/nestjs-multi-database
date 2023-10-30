import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import knexfile from '../knexfile';

@Injectable()
export class MySQLDbService {
  readonly knex: Knex;

  constructor() {
    this.knex = require('knex')(knexfile.mysql);
  }
}
