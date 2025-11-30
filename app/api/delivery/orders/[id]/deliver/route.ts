import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'DELIVERY') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { otp } = await request.json()

    // For simplicity, accept any OTP. In real app, generate and verify OTP
    if (!otp || otp.length !== 4) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: 'DELIVERED' },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Delivery confirmation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}