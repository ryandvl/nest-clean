import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  findById(id: string): Answer | null {
    throw new Error('Method not implemented.');
  }

  findManyByQuestionId(questionId: string, params: PaginationParams): Answer[] {
    throw new Error('Method not implemented.');
  }

  create(answer: Answer): void {
    throw new Error('Method not implemented.');
  }

  save(answer: Answer): void {
    throw new Error('Method not implemented.');
  }

  delete(answer: Answer): void {
    throw new Error('Method not implemented.');
  }
}
