import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

import { Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaQuestionAttachmentMapper {
  static toDomain({ id, questionId }: PrismaAttachment): QuestionAttachment {
    if (!questionId) {
      throw new Error('Invalid attachment type.');
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(id),
        questionId: new UniqueEntityID(questionId),
      },
      new UniqueEntityID(id),
    );
  }
}
