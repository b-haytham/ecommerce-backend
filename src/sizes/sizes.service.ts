import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size, SizeDocument } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size.name)
    private sizeModel: Model<SizeDocument>,
  ) {}

  create(createSizeDto: CreateSizeDto) {
    return this.sizeModel.create(createSizeDto)
  }

  findAll() {
    return this.sizeModel.find({})
  }

  findOne(id: string) {
    return this.sizeModel.findById(id)
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    const size = await this.findOne(id)
    if(!size) throw new NotFoundException('Size Not Found')
    size.name = updateSizeDto.name
    size.display_name = updateSizeDto.display_name
    size.description = updateSizeDto.description
    size.size_list = updateSizeDto.size_list
    return size.save()
  }

  async remove(id: string) {
    const size = await this.findOne(id)
    if(!size) throw new NotFoundException('Size Not Found')
    return size.remove()
  }
}
