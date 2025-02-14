import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

import { Comment as PrismaComment, Prisma } from '@prisma/client';

export class PrismaAnswerCommentMapper {
  static toDomain({
    content,
    answerId,
    authorId,
    createdAt,
    updatedAt,
    id,
  }: PrismaComment): AnswerComment {
    if (!answerId) {
      throw new Error('Invalid comment type.');
    }

    return AnswerComment.create(
      {
        content,
        authorId: new UniqueEntityID(authorId),
        answerId: new UniqueEntityID(answerId),
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma({
    id,
    authorId,
    answerId,
    content,
    createdAt,
    updatedAt,
  }: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      answerId: answerId.toString(),
      content,
      createdAt,
      updatedAt,
    };
  }
}
