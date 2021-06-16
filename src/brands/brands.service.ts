import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './entities/brand.entity';
import * as express from 'express';
import * as fs from 'fs/promises'
import * as path from 'path'


const filePathToUrl = (req: express.Request, path: string) => {
  return `${req.protocol}://${req.hostname}:3000${path}`;
};

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async create(file: Express.Multer.File, createBrandDto: CreateBrandDto, request: express.Request) {
    const file_path = file.path.split('/public')[1];
    const brand = await this.brandModel.create({
      image: file_path,
      name: createBrandDto.name,
      display_name: createBrandDto.display_name,
      description: createBrandDto.description,
    });
    return {...brand.toObject(), image: filePathToUrl(request, brand.image)}
  }

  async findAll(req: express.Request) {
    const brands = await this.brandModel.find({});

    return brands.map((b) => {
      const o = b.toObject();
      return { ...o, image: filePathToUrl(req, o.image) };
    });
  }

  async findOne(id: string, req: express.Request) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('Brand Not Found');
    brand.image = filePathToUrl(req, brand.image);
    return brand;
  }

  async findById(id: string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('Brand Not Found');
    return brand;
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    request: express.Request,
    file: Express.Multer.File
  ) {
    const file_path = file.path.split('/public')[1];
    const brand = await this.findOne(id, request);
    if(!brand) throw new NotFoundException('Brand Not Found')

    await fs.unlink(path.join(__dirname, '..', '..', 'public', 'upload', brand.image.split('upload/')[1]))
    
    brand.image = file_path 
    brand.name = updateBrandDto.name;
    brand.display_name = updateBrandDto.display_name;
    brand.description = updateBrandDto.description;
    await brand.save()
    return {...brand.toObject(), image: filePathToUrl(request, brand.image)};
  }

  async remove(id: string, request: express.Request) {
    const brand = await this.findOne(id, request)
    if(!brand) throw new NotFoundException('Brand Not Found')
    await brand.remove()
    await fs.unlink(path.join(__dirname, '..', '..', 'public', 'upload', brand.image.split('upload/')[1]))
    return brand
  }
}
