import { HASH_SALT } from "../constants/password_config";
import { ADMIN } from "../constants/roles";
import dbClient from "../src/dbClient";
import bcrypt from 'bcrypt';

async function main() {
    await dbClient.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: {
        id: 1,
          name: 'Admin',
        },
      });

    await dbClient.role.upsert({
        where: { name: 'Default' },
        update: {},
        create: {
        id: 2,
            name: 'Default',
        },
    });

    await dbClient.user.upsert({
        where: { email: 'admin@test.com' },
        update: {},
        create: {
            email: 'admin@test.com',
            first_name: 'Admin',
            last_name: 'Admin',
            role_id: ADMIN,
            birth_day: '2000-01-01T12:00:00Z',
            password: await bcrypt.hash('12345678', HASH_SALT)
        },
    });  
}

main()
  .then(async () => {
    await dbClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await dbClient.$disconnect()
    process.exit(1)
  })