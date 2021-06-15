import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import {
  Subcategory,
  SubcategoryDocument,
} from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name)
    private subcategoryModel: Model<SubcategoryDocument>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const cat = await this.categoriesService.findOne(createSubcategoryDto.category_id)
    if(!cat) throw new NotFoundException('Catgeroy Not Found')

    const subcat = await this.subcategoryModel.create({
      category: cat._id,
      name: createSubcategoryDto.name,
      display_name: createSubcategoryDto.display_name,
      description: createSubcategoryDto.description
    })

    await subcat.save()
    cat.sub_categories.push(subcat._id)
    await cat.save()
    return subcat.populate('category').execPopulate();
  }

  findAll() {
    return this.subcategoryModel.find({}).populate('category');
  }

  findOne(id: string) {
    return this.subcategoryModel.findById(id).populate('category');
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    const subcat = await this.findOne(id)
    if(!subcat) throw new NotFoundException('Sub Category Not Found')

    subcat.name = updateSubcategoryDto.name
    subcat.display_name = updateSubcategoryDto.display_name
    subcat.description = updateSubcategoryDto.description
    
    return (await subcat.save()).populate('category');
  }

  async remove(id: string) {
    const subcat = await this.findOne(id)
    if(!subcat) throw new NotFoundException('Sub Category Not Found')
    
    //@ts-ignore
    const cat = await this.categoriesService.findOne(subcat.category)

    //@ts-ignore
    cat.sub_categories.pull(subcat._id)
    await cat.save()
    return subcat.remove()
  }
}
