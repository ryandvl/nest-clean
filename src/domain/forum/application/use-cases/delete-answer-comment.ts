import { Either, left, right } from '@/core/either';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): DeleteAnswerCommentUseCaseResponse {
    const answerComment =
      this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
