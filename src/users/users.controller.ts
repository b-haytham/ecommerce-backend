import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.gard';
import { Roles } from './auth/roles.decorator';
import { UserRoles } from './entities/UserRoles';
import { RolesGuard } from './auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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
