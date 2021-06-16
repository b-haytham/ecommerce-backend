import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private productsService: ProductsService,
    private customersService: CustomersService
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const p = await this.productsService.findbyId(createReviewDto.product_id)
    if(!p) throw new NotFoundException('Product Not Found')

    const c = await this.customersService.findOne(createReviewDto.customer_id)
    if(!c) throw new NotFoundException('Customer Not Found')

    const r = await this.reviewModel.create({
      customer: c._id,
      product: p._id,
      content: createReviewDto.content,
      rating: createReviewDto.rating
    })  

    c.reviews.push(r._id)
    p.reviews.push(r._id)

    await c.save()
    await p.save()

    return r
  }

  findAll() {
    return this.reviewModel.find({}).populate('product').populate('customer')
  }

  async findOne(id: string) {
    const r = await this.reviewModel.findById(id).populate('product').populate('customer')
    if(!r) throw new NotFoundException('Review Not Found') 
    return r
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: string) {
    const r = await this.reviewModel.findById(id)
    if(!r) throw new NotFoundException('Review Not Found')

    //@ts-ignore
    const c = await this.customersService.findOne(r.customer)
    //@ts-ignore
    const p = await this.productsService.findbyId(r.product)

    await r.remove()

    //@ts-ignore
    c.reviews.pull(r._id)
    //@ts-ignore
    p.reviews.pull(r._id)

    await c.save()
    await p.save()

    return r
  }
}
