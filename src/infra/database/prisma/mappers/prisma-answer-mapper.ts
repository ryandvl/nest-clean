import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

import { Answer as PrismaAnswer, Prisma } from '@prisma/client';

export class PrismaAnswerMapper {
  static toDomain({
    content,
    questionId,
    authorId,
    createdAt,
    updatedAt,
    id,
  }: PrismaAnswer): Answer {
    return Answer.create(
      {
        content,
        questionId: new UniqueEntityID(questionId),
        authorId: new UniqueEntityID(authorId),
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
  }: Answer): Prisma.AnswerUncheckedCreateInput {
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
