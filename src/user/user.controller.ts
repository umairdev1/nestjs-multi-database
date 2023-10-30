import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  // @Get(':id')
  // async getById(@Param('id') id: number) {
  //   return this.userService.getById(id);
  // }

  @Post()
  async create(@Body() data: any) {
    return this.userService.create(data);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() data: any) {
  //   return this.userService.update(id, data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.userService.delete(id);
  // }
}
