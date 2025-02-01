import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionsRepository {
  findById(id: string): Question | null;
  findBySlug(slug: string): Question | null;
  findManyRecent(params: PaginationParams): Question[];
  save(question: Question): void;
  create(question: Question): void;
  delete(question: Question): void;
}
