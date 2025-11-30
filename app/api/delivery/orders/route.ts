import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'DELIVERY') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For simplicity, return all shipped orders. In real app, assign specific orders to delivery boys
    const orders = await prisma.order.findMany({
      where: { status: 'SHIPPED' },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            address: true,
          },
        },
        items: {
          include: {
            medicine: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Delivery orders fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}