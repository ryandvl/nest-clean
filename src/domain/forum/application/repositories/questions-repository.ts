import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';

export abstract class QuestionsRepository {
  abstract findById(id: string): Question | null;
  abstract findBySlug(slug: string): Question | null;
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>;
  abstract save(question: Question): void;
  abstract create(question: Question): void;
  abstract delete(question: Question): void;
}

export interface AsyncQuestionsRepository {
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}
