import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { getPaths, pathToUrl, removeFile } from './file.utils';
import { UpdateMainInfo } from './dto/update-main-info';
import { UpdateCountDto } from './dto/update-count.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateCateoriesANDSuncategoriesDto } from './dto/update-category-subcategory.dto';
import { UpdateSizeInfoDto } from './dto/update-size_info.dto';
import { UpdateColorInfoDto } from './dto/update-color_info.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

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
      in_stock: +createProductDto.count > 0 ? true : false,
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
      discount_info: {
        have_discount: createProductDto.discount_info.have_discount,
        discount_percentage: createProductDto.discount_info.discount_percentage
          ? createProductDto.discount_info.discount_percentage
          : null,
      },
    });

    category.product_number += 1;
    await category.save();

    sub_category.product_number += 1;
    await sub_category.save();

    brand.product_number += 1;
    await brand.save();

    product.thumbnail = pathToUrl(product.thumbnail, request) as string;
    product.images = pathToUrl(product.images, request) as string[];

    return product;
  }

  async findAll(request: express.Request) {
    const products = await this.productModel.find({});

    return products.map((p) => {
      p.images = pathToUrl(p.images, request) as string[];
      p.thumbnail = pathToUrl(p.thumbnail, request) as string;
      return p;
    });
  }

  async findOne(id: string, request: express.Request) {
    const p = await this.productModel.findById(id);
    if (!p) throw new NotFoundException('Product Not Found');

    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;
    return p;
  }

  async findbyId(id: string) {
    return this.productModel.findById(id);
  }

  async updateImages(
    id: string,
    files: UploadedProductFiles,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    const oldthumbnail = p.thumbnail;
    const oldImages = p.images;

    p.thumbnail = getPaths(files.thumbnail)[0];
    p.images = getPaths(files.images);

    await p.save();
    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    await removeFile(oldthumbnail);
    await removeFile(oldImages);
    return p;
  }

  async updateMainInfo(
    id: string,
    updateMainInfo: UpdateMainInfo,
    request: express.Request,
  ) {
    if (+updateMainInfo.price < 0)
      throw new BadRequestException('Price Must be Possitve');

    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    p.name = updateMainInfo.name;
    p.display_name = updateMainInfo.display_name;
    p.price = updateMainInfo.price;
    p.product_details = updateMainInfo.product_details;
    p.shippment_details = updateMainInfo.shippment_details;
    p.other_info = updateMainInfo.other_info;

    await p.save();
    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateCount(
    id: string,
    updateCountDto: UpdateCountDto,
    request: express.Request,
  ) {
    if (+updateCountDto.count < 0)
      throw new BadRequestException('Count Must be Possitve');
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    p.count = updateCountDto.count;

    await p.save();
    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    //@ts-ignore
    const oldbrand = await this.brandsService.findById(p.brand);

    const newBrand = await this.brandsService.findById(updateBrandDto.brand_id);
    if (!newBrand) throw new NotFoundException('Brand Not Found');

    p.brand = newBrand._id;
    await p.save();

    oldbrand.product_number -= 1;
    await oldbrand.save();

    newBrand.product_number += 1;
    await newBrand.save();

    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateCatgeoriesSubCategories(
    id: string,
    updateCategoriesDto: UpdateCateoriesANDSuncategoriesDto,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    //@ts-ignore
    const oldcategory = await this.categoriesService.findOne(p.category);
    const oldsubcategory = await this.subcategoriesService.findOne(
      //@ts-ignore
      p.sub_category,
    );

    const newcategory = await this.categoriesService.findOne(
      updateCategoriesDto.category_id,
    );
    const newsubcategory = await this.subcategoriesService.findOne(
      updateCategoriesDto.sub_category_id,
    );

    //@ts-ignore
    if (newcategory._id.toString() !== newsubcategory.category._id.toString())
      throw new BadRequestException(
        'This sub category does not exist on this this category',
      );

    p.sub_category = newsubcategory._id;
    p.category = newcategory._id;
    await p.save();

    oldcategory.product_number -= 1;
    oldsubcategory.product_number -= 1;

    newcategory.product_number += 1;
    newsubcategory.product_number += 1;

    await oldsubcategory.save();
    await oldcategory.save();
    await newsubcategory.save();
    await newcategory.save();

    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateSize(
    id: string,
    updateSizeInfoDto: UpdateSizeInfoDto,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    let size_system: SizeDocument;
    if (updateSizeInfoDto.size_system) {
      size_system = await this.sizesService.findOne(
        updateSizeInfoDto.size_system,
      );
      if (!size_system) throw new NotFoundException('Size Not Found');
    } else {
      size_system = null;
    }

    p.size_info.have_size = updateSizeInfoDto.have_size;
    p.size_info.size_system = size_system;
    p.size_info.available_sizes = updateSizeInfoDto.available_sizes
      ? updateSizeInfoDto.available_sizes
      : [];

    await p.save();
    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateColor(
    id: string,
    updateColorInfoDto: UpdateColorInfoDto,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    p.color_info.have_color = updateColorInfoDto.have_color;
    p.color_info.available_colors = updateColorInfoDto.available_colors
      ? updateColorInfoDto.available_colors
      : [];

    await p.save();

    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async updateDiscount(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
    request: express.Request,
  ) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    p.discount_info.have_discount = updateDiscountDto.have_discount;
    p.discount_info.discount_percentage = updateDiscountDto.discount_percentage
      ? updateDiscountDto.discount_percentage
      : p.discount_info.discount_percentage;

    await p.save();

    p.images = pathToUrl(p.images, request) as string[];
    p.thumbnail = pathToUrl(p.thumbnail, request) as string;

    return p;
  }

  async remove(id: string, request: express.Request) {
    const p = await this.findbyId(id);
    if (!p) throw new NotFoundException('Product Not Found');

    await p.remove();

    await removeFile(p.images);
    await removeFile(p.thumbnail);
    return p;
  }
}
