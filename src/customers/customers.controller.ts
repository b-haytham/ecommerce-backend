import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.gard';
import { Roles } from 'src/users/auth/roles.decorator';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { UserRoles } from 'src/users/entities/UserRoles';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customersService.create(createCustomerDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
