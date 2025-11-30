import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const medicines = await prisma.medicine.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(medicines)
  } catch (error) {
    console.error('Medicines fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, company, batchNumber, expiryDate, rate, mrp, stock, category } = await request.json()

    const medicine = await prisma.medicine.create({
      data: {
        name,
        company,
        batchNumber,
        expiryDate: new Date(expiryDate),
        rate: parseFloat(rate),
        mrp: parseFloat(mrp),
        stock: parseInt(stock),
        category,
      },
    })

    return NextResponse.json(medicine, { status: 201 })
  } catch (error) {
    console.error('Medicine creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}