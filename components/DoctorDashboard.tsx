'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Order {
  id: string
  status: string
  totalAmount: number
  createdAt: string
}

interface Payment {
  id: string
  amount: number
  method: string
  status: string
  dueAmount: number
}

export default function DoctorDashboard() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingPayments: 0,
    totalDue: 0,
  })

  useEffect(() => {
    fetchOrders()
    fetchPayments()
  }, [])

  const fetchOrders = async () => {
    const response = await fetch('/api/orders')
    if (response.ok) {
      const data = await response.json()
      setOrders(data)
      setStats(prev => ({ ...prev, totalOrders: data.length }))
    }
  }

  const fetchPayments = async () => {
    const response = await fetch('/api/payments')
    if (response.ok) {
      const data = await response.json()
      setPayments(data)
      const pendingPayments = data.filter((p: Payment) => p.status === 'PENDING').length
      const totalDue = data.reduce((sum: number, p: Payment) => sum + p.dueAmount, 0)
      setStats(prev => ({ ...prev, pendingPayments, totalDue }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-gray-600">Welcome, {session?.user?.name}</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/medicines">
                <Button>Browse Medicines</Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline">My Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingPayments}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalDue.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                        <p className={`text-sm ${order.status === 'DELIVERED' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{payment.method}</p>
                        <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{payment.amount.toFixed(2)}</p>
                        <p className={`text-sm ${payment.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`}>
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}