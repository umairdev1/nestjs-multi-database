import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll() {
    return this.todoService.getAll();
  }

  // @Get(':id')
  // async getById(@Param('id') id: number) {
  //   return this.todoService.getById(id);
  // }

  @Post()
  async create(@Body() data: any) {
    return this.todoService.create(data);
  }
  @Post('table')
  async createTodo() {
    try {
      // Call the create function from your service
      const result = await this.todoService.createTable();

      // Return the result as a response
      return { message: result };
    } catch (error) {
      return { message: 'Failed', error: error.message };
    }
  }
  // @Put(':id')
  // async update(@Param('id') id: number, @Body() data: any) {
  //   return this.todoService.update(id, data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.todoService.delete(id);
  // }
}
