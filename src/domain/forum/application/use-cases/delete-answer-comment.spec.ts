import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', () => {
    const answerComment = makeAnswerComment();

    inMemoryAnswerCommentsRepository.create(answerComment);

    sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    });

    inMemoryAnswerCommentsRepository.create(answerComment);

    const result = sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
