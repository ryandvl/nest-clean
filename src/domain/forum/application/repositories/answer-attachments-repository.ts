import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): AnswerAttachment[];
  deleteManyByAnswerId(answerId: string): void;
}
