import { Either, right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): FetchQuestionAnswersUseCaseResponse {
    const answers = this.answersRepository.findManyByQuestionId(questionId, {
      page,
    });

    return right({
      answers,
    });
  }
}
