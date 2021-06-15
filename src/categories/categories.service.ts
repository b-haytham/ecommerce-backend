import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto) 
  }

  findAll() {
    return this.categoryModel.find({})
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const cat = await this.findOne(id)
    if(!cat) throw new NotFoundException('Category Not Found')
    cat.name = updateCategoryDto.name
    cat.display_name = updateCategoryDto.display_name
    cat.description = updateCategoryDto.description
    return cat.save()
  }

  async remove(id: string) {
    const cat = await this.findOne(id)
    if(!cat) throw new NotFoundException('Category Not Found')
    return cat.remove()
  }
}
