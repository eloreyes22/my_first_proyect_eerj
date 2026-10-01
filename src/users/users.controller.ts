import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {    
  constructor(private readonly usersService: UsersService) {}

  @Post()
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'nuevo@techsolutions.com',
      },
      name: {
        type: 'string',
        example: 'Nuevo Usuario',
      },
      password: {
        type: 'string',
        example: '123456',
      },
      telephone: {
        type: 'string',
        example: '85555555',
      },
      tenantId: {
        type: 'number',
        example: 1,
      },
      role: {
        type: 'string',
        enum: ['USER', 'ADMIN'],
        example: 'USER',
      },
    },
    required: ['email', 'password', 'tenantId'],
  },
})
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
