import { Injectable } from '@nestjs/common';
import { MySQLDbService } from 'src/database/mysql-database.service';
import { PgDbService } from 'src/database/pg-database.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly pgKnexService: PgDbService,

    private readonly mysqlKnexService: MySQLDbService,
  ) {}

  async getAll() {
    const pgQuery = 'SELECT * FROM todo';
    const msqlQuery = 'SELECT * FROM user';

    try {
      const todoDetails = await this.pgKnexService.knex.raw(pgQuery);
      const userDetail = await this.mysqlKnexService.knex.raw(msqlQuery);

      if (todoDetails && userDetail) {
        const todos = todoDetails.rows;
        const authors = userDetail[0];

        const authorMap = authors.reduce((acc, author) => {
          acc[author.id] = author;
          return acc;
        }, {});

        const todoWithAuthor = todos.map((todo) => {
          return {
            ...todo,
            author: authorMap[todo.userid],
          };
        });

        return { message: 'Success', data: todoWithAuthor };
      }
    } catch (error) {
      return { message: 'Failed', error: error.message };
    }
  }

  async create(data: any) {
    try {
      const columns = Object.keys(data);
      const values = Object.values(data);
      const valuePlaceholders = new Array(columns.length).fill('?').join(', ');

      const query = `
        INSERT INTO todo (description, completed, userid)
        VALUES (${valuePlaceholders})
        RETURNING *
      `;
      const result = await this.pgKnexService.knex.raw(query, values);
      return { message: 'Created', data: result.rows[0] };
    } catch (error) {
      return { message: 'Failed', error: error.message };
    }
  }

  async createTable() {
    try {
      const createTableSQL = `
      CREATE TABLE mongodb (
        id SERIAL PRIMARY KEY,
        active BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
      await this.pgKnexService.knex.raw(createTableSQL);

      console.log('Table  has been created.');
    } catch (error) {
      console.error('Error creating the table:', error);
    }
  }
}
