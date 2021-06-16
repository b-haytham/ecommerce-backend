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
import { UpdateMainInfo } from './dto/update-main-info';
import { UpdateCountDto } from './dto/update-count.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateCateoriesANDSuncategoriesDto } from './dto/update-category-subcategory.dto';
import { UpdateSizeInfoDto } from './dto/update-size_info.dto';
import { UpdateColorInfoDto } from './dto/update-color_info.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

const editFileName = (req, file, callback) => {
  const name = `product-${uuid()}.${file.mimetype.split('/')[1]}`;
  callback(null, name);
};

export type UploadedProductFiles = {
  thumbnail: Array<Express.Multer.File>;
  images: Array<Express.Multer.File>;
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
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @UploadedFiles() files: UploadedProductFiles,
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
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: UploadedProductFiles,
    @Req() request: express.Request,
  ) {
    return this.productsService.updateImages(id, updateProductDto, files, request);
  }

  @Put(':id/main-info')
  updateMainInfo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMainInfoDto: UpdateMainInfo,
    @Req() request: express.Request,
  ) {
    return this.productsService.updateMainInfo(id, updateMainInfoDto, request);
  }

  @Put(':id/count-info')
  updateCountInfo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountDto: UpdateCountDto,
    @Req() request: express.Request,
  ) {
    return this.productsService.updateCount(id, updateCountDto, request);
  }

  @Put(':id/brand')
  updateBrandInfo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
    @Req() request: express.Request,

  ) {
    return this.productsService.updateBrand(id, updateBrandDto, request);
  }

  @Put(':id/category-info')
  updateCategorySubCategory(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateCateoriesANDSuncategoriesDto: UpdateCateoriesANDSuncategoriesDto,
    @Req() request: express.Request,    
    ) {
    return this.productsService.updateCatgeoriesSubCategories(id, updateCateoriesANDSuncategoriesDto, request)
  }

  @Put(':id/size-info')
  updateSizeInfoDto(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateSizeInfoDto: UpdateSizeInfoDto,
    @Req() request: express.Request,

  ) {
    return this.productsService.updateSize(id, updateSizeInfoDto, request)
  }

  @Put(':id/color-info')
  updateColorInfoDto(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateColorInfoDto: UpdateColorInfoDto,
    @Req() request: express.Request,

  ) {
    return this.productsService.updateColor(id, updateColorInfoDto, request)
  }

  @Put(':id/discount-info')
  updateDiscountInfoDto(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateDiscountDto: UpdateDiscountDto,
    @Req() request: express.Request,

  ) {
    return this.productsService.updateDiscount(id, updateDiscountDto, request)
  }


  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: express.Request) {
    return this.productsService.remove(id, request);
  }
}
