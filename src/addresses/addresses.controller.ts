import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.gard';
import { Roles } from 'src/users/auth/roles.decorator';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { UserRoles } from 'src/users/entities/UserRoles';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @ApiBody({type: CreateAddressDto})
  @ApiCreatedResponse({description: 'created succesfully'})
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiBadRequestResponse({description: 'Bad Request'})
  create(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse({description: 'Bad Request'})
  @ApiBody({type: UpdateAddressDto})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
