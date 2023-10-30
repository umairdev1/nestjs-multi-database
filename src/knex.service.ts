import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import knexConfig from './knexfile';

@Injectable()
export class KnexService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(knexConfig.development);
  }

  getKnex(): Knex {
    return this.knex;
  }
}
