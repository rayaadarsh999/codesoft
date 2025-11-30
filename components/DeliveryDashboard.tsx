'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Order {
  id: string
  status: string
  totalAmount: number
  user: {
    name: string
    address: string
    phone: string
  }
  items: Array<{
    medicine: { name: string }
    quantity: number
  }>
}

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    fetchAssignedOrders()
  }, [])

  const fetchAssignedOrders = async () => {
    const response = await fetch('/api/delivery/orders')
    if (response.ok) {
      const data = await response.json()
      setOrders(data)
    }
  }

  const confirmDelivery = async () => {
    if (!selectedOrder || !otp) return

    const response = await fetch(`/api/delivery/orders/${selectedOrder.id}/deliver`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp }),
    })

    if (response.ok) {
      alert('Delivery confirmed successfully!')
      setSelectedOrder(null)
      setOtp('')
      fetchAssignedOrders()
    } else {
      alert('Invalid OTP or delivery confirmation failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Order #{order.id.slice(-8)}</p>
                          <p className="text-sm text-gray-600">{order.user.name}</p>
                          <p className="text-sm text-gray-600">{order.user.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                          <p className={`text-sm ${order.status === 'SHIPPED' ? 'text-blue-600' : 'text-yellow-600'}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedOrder && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Customer Information</h3>
                      <p>Name: {selectedOrder.user.name}</p>
                      <p>Phone: {selectedOrder.user.phone}</p>
                      <p>Address: {selectedOrder.user.address}</p>
                    </div>

                    <div>
                      <h3 className="font-medium">Order Items</h3>
                      <ul className="list-disc list-inside">
                        {selectedOrder.items.map((item, index) => (
                          <li key={index}>
                            {item.medicine.name} - Quantity: {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter delivery OTP"
                      />
                    </div>

                    <Button onClick={confirmDelivery} className="w-full">
                      Confirm Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}