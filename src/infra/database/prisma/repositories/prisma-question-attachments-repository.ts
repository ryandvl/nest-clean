import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(questionId: string): QuestionAttachment[] {
    throw new Error('Method not implemented.');
  }

  deleteManyByQuestionId(questionId: string): void {
    throw new Error('Method not implemented.');
  }
}
