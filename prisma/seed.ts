import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@magadhpharmacy.com' },
    update: {},
    create: {
      email: 'admin@magadhpharmacy.com',
      name: 'Admin',
      phone: '1234567890',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create sample medicines
  const medicines = [
    {
      name: 'Paracetamol',
      company: 'Cipla',
      batchNumber: 'BATCH001',
      expiryDate: new Date('2025-12-31'),
      rate: 10.0,
      mrp: 15.0,
      stock: 100,
      category: 'Painkiller',
    },
    {
      name: 'Amoxicillin',
      company: 'Sun Pharma',
      batchNumber: 'BATCH002',
      expiryDate: new Date('2025-11-30'),
      rate: 25.0,
      mrp: 35.0,
      stock: 50,
      category: 'Antibiotic',
    },
    {
      name: 'Ibuprofen',
      company: 'Dr. Reddy\'s',
      batchNumber: 'BATCH003',
      expiryDate: new Date('2026-01-15'),
      rate: 8.0,
      mrp: 12.0,
      stock: 75,
      category: 'Painkiller',
    },
  ]

  for (const medicine of medicines) {
    await prisma.medicine.upsert({
      where: { name_company_batchNumber: { name: medicine.name, company: medicine.company, batchNumber: medicine.batchNumber } },
      update: {},
      create: medicine,
    })
  }

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.disconnect()
  })