import { PartialType } from '@nestjs/mapped-types';
import { PostsModel } from '../entities/post/posts.entity';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';

export class UpdatePostDto extends PartialType(PostsModel) {
  @IsString({
    message: stringValidationMessage,
  })
  @IsOptional()
  title?: string;

  @IsString({
    message: stringValidationMessage,
  })
  @IsOptional()
  content?: string;
}
