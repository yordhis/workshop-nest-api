import { PrismaClient } from '@prisma/client';
import  { ArticleSeeder }  from './ArticleSeeder';
import { UserSeeder } from './UserSeeder';

const prisma = new PrismaClient();

async function main() {

  /** Seeders */
  await UserSeeder()
  await ArticleSeeder()


}


// execute the seeders
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });