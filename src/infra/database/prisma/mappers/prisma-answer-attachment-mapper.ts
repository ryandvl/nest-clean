import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

import { Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaAnswerAttachmentMapper {
  static toDomain({ id, answerId }: PrismaAttachment): AnswerAttachment {
    if (!answerId) {
      throw new Error('Invalid attachment type.');
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(id),
        answerId: new UniqueEntityID(answerId),
      },
      new UniqueEntityID(id),
    );
  }
}
