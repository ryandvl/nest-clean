import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  hash(plain: string): string {
    return plain.concat('-hashed');
  }

  compare(plain: string, hash: string): boolean {
    return plain.concat('-hashed') === hash;
  }
}
