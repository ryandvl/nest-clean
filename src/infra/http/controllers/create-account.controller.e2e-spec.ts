import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { FakeUser } from '@/utils/fake-data';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account (E2E)', () => {
  let app: INestApplication, prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /accounts', async () => {
    const userInformations = {
      name: 'ryandvl',
      email: 'ryandvl@example.com',
      password: '123456',
    };

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send(userInformations);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: userInformations.email,
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
