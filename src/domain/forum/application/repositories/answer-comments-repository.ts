import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
  findById(id: string): AnswerComment | null;
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): AnswerComment[];
  create(answerComment: AnswerComment): void;
  delete(answerComment: AnswerComment): void;
}
