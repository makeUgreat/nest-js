import { PostsModel } from '../entities/post/posts.entity';
import { PickType } from '@nestjs/mapped-types';

// Pick, Omit, Partial -> Type 반환
// PickType, OmitType, PartialType -> 값을 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
