import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]
})
export class ReviewsModule {}
