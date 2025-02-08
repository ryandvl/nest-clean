import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';

import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaStudentMapper {
  static toDomain({ name, email, password, id }: PrismaUser): Student {
    return Student.create(
      {
        name,
        email,
        password,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma({
    name,
    email,
    password,
    id,
  }: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: id.toString(),
      name,
      email,
      password,
    };
  }
}
