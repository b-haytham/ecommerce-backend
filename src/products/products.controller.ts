import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as express from 'express';

const editFileName = (req, file, callback) => {
  const name = `product-${uuid()}.${file.mimetype.split('/')[1]}`;
  callback(null, name);
};

export type UploadedProductFiles = {thumbnail: Array< Express.Multer.File>, images: Array<Express.Multer.File>}

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 8 },
      ],
      {
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', '..', 'public', 'upload'));
          },
          filename: editFileName,
        }),
      },
    ),
  )
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @UploadedFiles() files: UploadedProductFiles ,
    @Req() request: express.Request,
  ) {

//  return createProductDto;
    return this.productsService.create(createProductDto, files, request);
  }

  @Get()
  findAll(@Req() request: express.Request) {
    return this.productsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: express.Request) {
    return this.productsService.findOne(id, request);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 8 },
      ],
      {
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', '..', 'public', 'upload'));
          },
          filename: editFileName,
        }),
      },
    ),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() request: express.Request,
  ) {
    return this.productsService.update(id, updateProductDto, files, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: express.Request) {
    return this.productsService.remove(id, request);
  }
}
