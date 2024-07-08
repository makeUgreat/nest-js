import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersModel } from '../../../users/entities/users.entity';
import { BaseModel } from '../../../common/entity/base.entity';

@Entity()
export class PostsModel extends BaseModel {
  // 1) UsersModel 과 연동, Foreign Key 사용
  // 2) null 이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
