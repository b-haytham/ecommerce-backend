import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { SizesService } from 'src/sizes/sizes.service';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { UploadedProductFiles } from './products.controller';

import * as express from 'express';
import { SizeDocument } from 'src/sizes/entities/size.entity';
import { getPaths, pathToUrl } from './file.utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private sizesService: SizesService,
    private brandsService: BrandsService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: UploadedProductFiles,
    request: express.Request,
  ) {
    console.log('Images >>>> ', pathToUrl(getPaths(files.images), request));
    console.log(
      'Thumbnails>>> ',
      pathToUrl(getPaths(files.thumbnail), request),
    );

    const brand = await this.brandsService.findOne(
      createProductDto.brand_id,
      request,
    );
    if (!brand) throw new NotFoundException('Brand Not Found');
    console.log('BRAND >> ', brand);

    const category = await this.categoriesService.findOne(
      createProductDto.category_id,
    );
    if (!category) throw new NotFoundException('Category Not Found');
    console.log('Category >> ', category);

    const sub_category = await this.subcategoriesService.findOne(
      createProductDto.sub_category_id,
    );
    if (!sub_category) throw new NotFoundException('Sub Category Not Found');
    console.log('Sub Category >> ', sub_category);

    let size: SizeDocument;
    if (createProductDto.size_info.size_system) {
      size = await this.sizesService.findOne(
        createProductDto.size_info.size_system,
      );
    } else {
      size = null;
    }
    console.log('Size >> ', size);

    const product = await this.productModel.create({
      name: createProductDto.name,
      display_name: createProductDto.display_name,
      price: createProductDto.price,
      count: createProductDto.count,
      thumbnail: getPaths(files.thumbnail)[0],
      images: getPaths(files.images),
      product_details: createProductDto.product_details,
      shippment_details: createProductDto.shippment_details,
      brand: brand._id,
      category: category._id,
      sub_category: sub_category._id,
      size_info: {
        have_size: createProductDto.size_info.have_size,
        size_system: size ? size._id : null,
        available_sizes: createProductDto.size_info.available_sizes
          ? createProductDto.size_info.available_sizes
          : [],
      },
      color_info: {
        have_color: createProductDto.color_info.have_color,
        available_colors: createProductDto.color_info.available_colors
          ? createProductDto.color_info.available_colors
          : [],
      },
    });

    return {
      ...product.toObject(),
      thumbnail: pathToUrl(product.thumbnail, request),
      images: pathToUrl(product.images, request),
    };
  }

  findAll(request: express.Request) {
    return `This action returns all products`;
  }

  findOne(id: string, request: express.Request) {
    return `This action returns a #${id} product`;
  }

  update(
    id: string,
    updateProductDto: UpdateProductDto,
    files: Array<Express.Multer.File>,
    request: express.Request,
  ) {
    return `This action updates a #${id} product`;
  }

  remove(id: string, request: express.Request) {
    return `This action removes a #${id} product`;
  }
}
