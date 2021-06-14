import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('customers')
  createCustomer(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createCustomer(createUserDto);
  }

  @Post('admins')
  createAdmin(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto)
  }

  @Post('customers/login')
  loginCustomer(@Body(ValidationPipe) loginUserDto: LoginUserDto){
    return this.usersService.loginCustomer(loginUserDto)
  }

  @Post('admins/login')
  loginAdmin(@Body(ValidationPipe) loginUserDto: LoginUserDto){
    return this.usersService.loginAdmin(loginUserDto)
  }


  @Get()
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
