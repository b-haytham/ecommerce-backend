import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
