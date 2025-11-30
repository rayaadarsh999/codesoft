'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Order {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  user: {
    name: string
    email: string
    phone: string
    clinic: string
    address: string
  }
  items: Array<{
    medicine: { name: string }
    quantity: number
    price: number
  }>
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await fetch('/api/admin/orders')
    if (response.ok) {
      const data = await response.json()
      setOrders(data)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    })

    if (response.ok) {
      fetchOrders()
    } else {
      alert('Failed to update order status')
    }
  }

  const assignDelivery = async (orderId: string, deliveryBoy: string) => {
    const response = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: 'SHIPPED', deliveryBoy }),
    })

    if (response.ok) {
      fetchOrders()
    } else {
      alert('Failed to assign delivery')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{order.id.slice(-8)}</CardTitle>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{order.totalAmount.toFixed(2)}</p>
                      <p className={`text-sm ${order.status === 'DELIVERED' ? 'text-green-600' : order.status === 'SHIPPED' ? 'text-blue-600' : 'text-yellow-600'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Customer Details</h3>
                      <p><strong>Name:</strong> {order.user.name}</p>
                      <p><strong>Email:</strong> {order.user.email}</p>
                      <p><strong>Phone:</strong> {order.user.phone}</p>
                      <p><strong>Clinic:</strong> {order.user.clinic}</p>
                      <p><strong>Address:</strong> {order.user.address}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm">
                            {item.medicine.name} - Qty: {item.quantity} - ₹{item.price.toFixed(2)} each
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    {order.status === 'PENDING' && (
                      <Button onClick={() => updateOrderStatus(order.id, 'PACKED')}>
                        Mark as Packed
                      </Button>
                    )}
                    {order.status === 'PACKED' && (
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => assignDelivery(order.id, value)}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Assign Delivery Boy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="John Doe">John Doe</SelectItem>
                            <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                            <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {order.status === 'SHIPPED' && (
                      <p className="text-blue-600">Assigned to: {order.deliveryBoy || 'Not assigned'}</p>
                    )}
                    {order.status === 'DELIVERED' && (
                      <p className="text-green-600">Delivered successfully</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}