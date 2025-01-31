import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { FakeQuestion, FakeUser } from '@/utils/fake-data';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: FakeUser,
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.createMany({
      data: Array.from({ length: 2 }).map((_, i) => ({
        title: `Question 0${i + 1}`,
        slug: `question-0${i + 1}`,
        content: `Question content 0${i + 1}`,
        authorId: user.id,
      })),
    });

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
      ],
    });
  });
});
