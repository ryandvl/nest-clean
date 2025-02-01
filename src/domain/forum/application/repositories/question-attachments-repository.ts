import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): QuestionAttachment[];
  deleteManyByQuestionId(questionId: string): void;
}
