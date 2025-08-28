import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/noSql/user';
import { adminSeed } from '../config/env/development';

export async function seedAdmin() {
  const repo = new UserRepository();

  const exists = await repo.findUserByName(adminSeed.name);
  if (exists) {
    console.log('[seedAdmin] Admin já existe:', adminSeed.name);
    return;
  }

  const hash = bcrypt.hashSync(adminSeed.password, 10);

  await repo.createUser({
    // @ts-ignore
    _id: undefined,
    name: adminSeed.name,
    password: hash,
    role: adminSeed.role,
    mustChangePassword: adminSeed.mustChangeOnFirstLogin,
    created_at: new Date(),
  } as any);

  console.log('[seedAdmin] Admin criado:', adminSeed.name);
}
