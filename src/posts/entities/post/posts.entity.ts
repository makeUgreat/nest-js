import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersModel } from '../../../users/entities/users.entity';
import { BaseModel } from '../../../common/entity/base.entity';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class PostsModel extends BaseModel {
  // 1) UsersModel 과 연동, Foreign Key 사용
  // 2) null 이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsString({
    message: 'title은 string 타입을 입력 해야합니다.',
  })
  title?: string;

  @Column()
  @IsString()
  content?: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
