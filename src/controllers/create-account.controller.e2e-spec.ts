import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { JohnDoeInformations } from '@/utils/fake_users';
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
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send(JohnDoeInformations);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: JohnDoeInformations.email,
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
