import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Answer | null;
  findManyByQuestionId(questionId: string, params: PaginationParams): Answer[];
  create(answer: Answer): void;
  save(answer: Answer): void;
  delete(answer: Answer): void;
}
