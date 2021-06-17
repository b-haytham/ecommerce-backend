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
  UseGuards,
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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.gard';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { UserRoles } from 'src/users/entities/UserRoles';
import { Roles } from 'src/users/auth/roles.decorator';

export type UploadedProductFiles = {
  images: Array<Express.Multer.File>;
  thumbnail: Array<Express.Multer.File>;
};

const editFileName = (req, file, callback) => {
  const name = `product-${uuid()}.${file.mimetype.split('/')[1]}`;
  callback(null, name);
};

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateMainInfo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMainInfo: UpdateMainInfo,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateMainInfo(id, updateMainInfo, req);
  }

  @Put(':id/count-info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateCount(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountDto: UpdateCountDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateCount(id, updateCountDto, req);
  }

  @Put(':id/brand')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateBrand(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateBrand(id, updateBrandDto, req);
  }

  @Put(':id/category_info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateSize(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSizeInfoDto: UpdateSizeInfoDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateSize(id, updateSizeInfoDto, req);
  }

  @Put(':id/color_info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateColor(
    @Param('id') id: string,
    @Body(ValidationPipe) updateColorInfoDto: UpdateColorInfoDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateColor(id, updateColorInfoDto, req);
  }

  @Put(':id/discout_info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  updateDiscount(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDiscountDto: UpdateDiscountDto,
    @Req() req: express.Request,
  ) {
    return this.productsService.updateDiscount(id, updateDiscountDto, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  remove(@Param('id') id: string, @Req() req: express.Request) {
    return this.productsService.remove(id, req);
  }
}
