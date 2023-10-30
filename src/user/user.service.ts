import { Injectable } from '@nestjs/common';
import { MySQLDbService } from 'src/database/mysql-database.service';

@Injectable()
export class UserService {
  constructor(private readonly knexService: MySQLDbService) {}

  async getAll() {
    const query = 'SELECT * FROM user';

    try {
      const result = await this.knexService.knex.raw(query);
      return { message: 'Success', data: result[0] };
    } catch (error) {
      return { message: 'Failed', error: error.message };
    }
  }

  async create(data: any) {
    let query = 'INSERT INTO user (';
    const columns = Object.keys(data);
    const values = Object.values(data);

    query += columns.join(', ') + ') VALUES (';

    for (let i = 0; i < columns.length; i++) {
      query += i === 0 ? '?' : ', ?';
    }

    query += ')';

    try {
      const result = await this.knexService.knex.raw(query, values);
      if (result) {
        return {
          message: 'Created',
          data: { id: result[0].insertId, ...data },
        };
      } else {
        return {
          message: 'Failed',
          error: 'Insert operation did not affect 1 row.',
        };
      }
    } catch (error) {
      return { message: 'Failed', error: error.message };
    }
  }
}
