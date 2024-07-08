import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/post/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';

export interface PostModel {
  id: number;
  author: string;
  content: string;
  title: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1234,
    commentCount: 133,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 혜린',
    content: '노래 연습하고있는 혜린',
    likeCount: 1234,
    commentCount: 133,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙링크 로제',
    content: '종운 노래중',
    likeCount: 12334,
    commentCount: 133,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        // id: id, -> 키 값 이름이 같으면 지우고 하나만 써도됨
        id,
      },
      relations: ['author'],
    });

    // const post = posts.find((post) => post.id === +id);
    // // Array 객체의 find 메서드를 이용하는데 배열의 각 요소(post)에서 id의 값을 외부인자 id와 비교해서
    // // true인 요소(post)만 응답한다
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, postDto: CreatePostDto) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, title: string, content: string) {
    // save의 기능
    // 1) 만약 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    // const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);
    // posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));
    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);
    return postId;
  }
}
