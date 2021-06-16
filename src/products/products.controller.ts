import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { UpdateColorInfoDto } from './dto/update-color_info.dto';
import { UpdateSizeInfoDto } from './dto/update-size_info.dto';
import { UpdateCateoriesANDSuncategoriesDto } from './dto/update-category-subcategory.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import { UpdateMainInfo } from './dto/update-main-info';

import * as express from 'express';
import * as path from 'path';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';

export type UploadedProductFiles = {
  images: Array<Express.Multer.File>;
  thumbnail: Array<Express.Multer.File>;
};

const editFileName = (req, file, callback) => {
  const name = `product-${uuid()}.${file.mimetype.split('/')[1]}`;
  callback(null, name);
};

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
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: UploadedProductFiles,
    @Req() request: express.Request
  ) {
      return this.productsService.create(createProductDto, files, request)
  }

  @Get()
  findAll(@Req() req: express.Request) {
    return this.productsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: express.Request) {
    return this.productsService.findOne(id, req);
  }

  @Put(':id/images')
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
  updateImages(
      @Param('id') id: string,
      @UploadedFiles() files: UploadedProductFiles,
      @Req() req: express.Request
  ) {
      return this.productsService.updateImages(id, files, req)
  }

  @Put(':id/main-info')
  updateMainInfo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMainInfo: UpdateMainInfo,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateMainInfo(id, updateMainInfo, req);
  }

  @Put(':id/count-info')
  updateCount(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountDto: UpdateCountDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateCount(id, updateCountDto, req);
  }

  @Put(':id/brand')
  updateBrand(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateBrand(id, updateBrandDto, req);
  }

  @Put(':id/category_info')
  updateCatgeoriesSubCategories(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateCateoriesANDSuncategoriesDto: UpdateCateoriesANDSuncategoriesDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateCatgeoriesSubCategories(
      id,
      updateCateoriesANDSuncategoriesDto,
      req,
    );
  }

  @Put(':id/size_info')
  updateSize(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSizeInfoDto: UpdateSizeInfoDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateSize(id, updateSizeInfoDto, req);
  }

  @Put(':id/color_info')
  updateColor(
    @Param('id') id: string,
    @Body(ValidationPipe) updateColorInfoDto: UpdateColorInfoDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateColor(id, updateColorInfoDto, req);
  }

  @Put(':id/discout_info')
  updateDiscount(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDiscountDto: UpdateDiscountDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateDiscount(id, updateDiscountDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: express.Request) {
    return this.productsService.remove(id, req);
  }
}
