import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

import { Comment as PrismaComment, Prisma } from '@prisma/client';

export class PrismaQuestionCommentMapper {
  static toDomain({
    content,
    questionId,
    authorId,
    createdAt,
    updatedAt,
    id,
  }: PrismaComment): QuestionComment {
    if (!questionId) {
      throw new Error('Invalid comment type.');
    }

    return QuestionComment.create(
      {
        content,
        authorId: new UniqueEntityID(authorId),
        questionId: new UniqueEntityID(questionId),
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma({
    id,
    authorId,
    questionId,
    content,
    createdAt,
    updatedAt,
  }: QuestionComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      questionId: questionId.toString(),
      content,
      createdAt,
      updatedAt,
    };
  }
}
