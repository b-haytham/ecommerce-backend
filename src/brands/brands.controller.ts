import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import * as express from 'express';
import * as path from 'path';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid'


const editFileName = (req, file, callback) => {
  const name = `brand-${uuid()}.${file.mimetype.split('/')[1]}`
  callback(null, name);
};

@Controller('api/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', '..', 'public', 'upload'));
        },
        filename: editFileName,
      }),
    }),
  )
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: express.Request
  ) {
    return this.brandsService.create(file, createBrandDto, request);
  }

  @Get()
  findAll(@Req() request: express.Request) {
    return this.brandsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: express.Request) {
    return this.brandsService.findOne(id, request);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', '..', 'public', 'upload'));
        },
        filename: editFileName,
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Req() request: express.Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.brandsService.update(id, updateBrandDto, request, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: express.Request) {
    return this.brandsService.remove(id, request);
  }
}
