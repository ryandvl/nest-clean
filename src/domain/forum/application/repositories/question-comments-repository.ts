import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
  findById(id: string): QuestionComment | null;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): QuestionComment[];
  create(questionComment: QuestionComment): void;
  delete(questionComment: QuestionComment): void;
}
