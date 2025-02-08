import { Student } from '../../enterprise/entities/student';

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Student | null;
  abstract create(student: Student): void;
}

export abstract class AsyncStudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>;
  abstract create(student: Student): Promise<void>;
}
