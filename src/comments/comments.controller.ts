import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.gard';
import { Roles } from 'src/users/auth/roles.decorator';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { UserRoles } from 'src/users/entities/UserRoles';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.CUSTOMER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
