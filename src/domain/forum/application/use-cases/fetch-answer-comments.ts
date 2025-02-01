import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { Either, right } from '@/core/either';

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): FetchAnswerCommentsUseCaseResponse {
    const answerComments = this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      {
        page,
      },
    );

    return right({
      answerComments,
    });
  }
}
