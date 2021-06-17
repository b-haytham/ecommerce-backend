import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.gard';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { UserRoles } from 'src/users/entities/UserRoles';
import { Roles } from 'src/users/auth/roles.decorator';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN)
  create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  updateStatus(@Param('id') id: string, @Body(ValidationPipe) updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateStatus(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( UserRoles.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
