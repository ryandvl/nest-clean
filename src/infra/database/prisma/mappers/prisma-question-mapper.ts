import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

import { Question as PrismaQuestion } from '@prisma/client';

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
}
