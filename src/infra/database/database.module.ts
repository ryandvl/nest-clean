import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaAnswerAttachmentsRepository,
  PrismaAnswerCommentsRepository,
  PrismaAnswersRepository,
  PrismaQuestionAttachmentsRepository,
  PrismaQuestionCommentsRepository,
  PrismaQuestionsRepository,
} from './prisma/repositories';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
  ],
})
export class DatabaseModule {}
