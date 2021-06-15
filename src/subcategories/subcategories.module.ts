import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategorySchema } from './entities/subcategory.entity';

@Module({
  imports: [
    CategoriesModule,
    MongooseModule.forFeature([{name: Subcategory.name, schema: SubcategorySchema}])
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  exports: [SubcategoriesService]
})
export class SubcategoriesModule {}
