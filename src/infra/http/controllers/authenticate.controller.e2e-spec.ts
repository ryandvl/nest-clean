import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { FakeUser } from '@/utils/fake-data';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('Authenticate (E2E)', () => {
  let app: INestApplication, prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    const userInformations = {
      name: 'ryandvl',
      email: 'ryandvl@example.com',
      password: '123456',
    };

    await prisma.user.create({
      data: {
        name: userInformations.name,
        email: userInformations.email,
        password: await hash(userInformations.password, 8),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send(userInformations);

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
