import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from '../../posts/entities/post/posts.entity';
import { BaseModel } from '../../common/entity/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { lengthValidationMessage } from '../../common/validation-message/length-validation.message';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';
import { emailValidation } from '../../common/validation-message/email-validation.message';
import { Exclude, Expose } from 'class-transformer';

// @Exclude()
@Entity()
export class UsersModel extends BaseModel {
  @Column({ length: 20, unique: true })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(1, 15, {
    // 값이 유효하지 않은 경우, class-validator 라이브러리는 lengthValidationMessage 함수를 호출합니다.
    // 이 함수 호출 시 ValidationArguments 객체를 자동으로 인수로 전달합니다.
    message: lengthValidationMessage,
  })
  nickname: string;

  @Expose()
  get nicknameAndEmail() {
    return this.nickname + '/' + this.email;
  }

  @Column({ unique: true })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidation,
    },
  )
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  /* Request
   * frontend -> backend
   * plain object (JSON) -> class instance (dto)
   *
   * Response
   * backend -> frontend
   * class instance (dto) -> plain object (JSON)
   *
   * toClassOnly -> class instance로 변환될 때만 (Request)
   * toPlainOnly -> plain object로 변환될 때만 (Response)
   * */
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
