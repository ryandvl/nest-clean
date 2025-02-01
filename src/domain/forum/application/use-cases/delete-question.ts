import { Either, left, right } from '@/core/either';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): DeleteQuestionUseCaseResponse {
    const question = this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    this.questionsRepository.delete(question);

    return right({});
  }
}
