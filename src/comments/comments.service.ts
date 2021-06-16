import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private productsService: ProductsService,
    private customersService: CustomersService,
    ) {}

  async create(createCommentDto: CreateCommentDto) {
    const product = await this.productsService.findbyId(createCommentDto.product_id)
    if(!product) throw new NotFoundException('Product Not Found')

    const customer = await this.customersService.findOne(createCommentDto.customer_id)
    if(!customer) throw new NotFoundException('Customer Not Found')

    const comment = await this.commentModel.create({
      customer: customer._id,
      product: product._id,
      content: createCommentDto.content,
    })  

    customer.comments.push(comment._id)
    product.comments.push(comment._id)

    await customer.save()
    await product.save()

    return comment
  }

  findAll() {
    return this.commentModel.find({}).populate('customer').populate('product')
  }

  async findOne(id: string) {
    const c = await this.commentModel.findById(id).populate('customer').populate('product')
    if(!c) throw new NotFoundException('Comment Not Found')
    return c
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    const comment = await this.findOne(id)
    if(!comment) throw new NotFoundException('Comment Not Found')

     //@ts-ignore
     const customer = await this.customersService.findOne(comment.customer)
     //@ts-ignore
     const product = await this.productsService.findbyId(comment.product)
 
     await comment.remove()
 
     //@ts-ignore
     customer.comments.pull(comment._id)
     //@ts-ignore
     product.comments.pull(comment._id)
 
     await customer.save()
     await product.save()
 
     return comment
  }
}
