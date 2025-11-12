import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@restaurant.com' },
    update: {},
    create: {
      email: 'admin@restaurant.com',
      password: hashedPassword,
    },
  });

  // Create default categories
  const grill = await prisma.category.upsert({
    where: { name: 'Grill' },
    update: {},
    create: {
      name: 'Grill',
      nameInArabic: 'جريل',
    },
  });

  const salads = await prisma.category.upsert({
    where: { name: 'Salads' },
    update: {},
    create: {
      name: 'Salads',
      nameInArabic: 'سلطات',
    },
  });

  const drinks = await prisma.category.upsert({
    where: { name: 'Drinks' },
    update: {},
    create: {
      name: 'Drinks',
      nameInArabic: 'مشروبات',
    },
  });

  console.log('Seeded categories:', { grill, salads, drinks });
  console.log('Seeded admin user:', admin.email);
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

