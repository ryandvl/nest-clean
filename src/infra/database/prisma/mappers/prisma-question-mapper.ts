import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

import { Question as PrismaQuestion, Prisma } from '@prisma/client';

export class PrismaQuestionMapper {
  static toDomain({
    title,
    content,
    authorId,
    bestAnswerId,
    slug,
    createdAt,
    updatedAt,
    id,
  }: PrismaQuestion): Question {
    return Question.create(
      {
        title,
        content,
        authorId: new UniqueEntityID(authorId),
        bestAnswerId: bestAnswerId ? new UniqueEntityID(bestAnswerId) : null,
        slug: Slug.create(slug),
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma({
    id,
    authorId,
    bestAnswerId,
    title,
    content,
    slug,
    createdAt,
    updatedAt,
  }: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      bestAnswerId: bestAnswerId?.toString(),
      title,
      content,
      slug: slug.value,
      createdAt,
      updatedAt,
    };
  }
}
