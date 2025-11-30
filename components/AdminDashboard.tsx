'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface Stats {
  totalDoctors: number
  totalOrders: number
  pendingDeliveries: number
  lowStockAlerts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalDoctors: 0,
    totalOrders: 0,
    pendingDeliveries: 0,
    lowStockAlerts: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    // Fetch stats from API
    const doctorsResponse = await fetch('/api/admin/doctors')
    const ordersResponse = await fetch('/api/admin/orders')
    const medicinesResponse = await fetch('/api/medicines')

    if (doctorsResponse.ok) {
      const doctors = await doctorsResponse.json()
      setStats(prev => ({ ...prev, totalDoctors: doctors.length }))
    }

    if (ordersResponse.ok) {
      const orders = await ordersResponse.json()
      const pendingDeliveries = orders.filter((o: any) => o.status !== 'DELIVERED').length
      setStats(prev => ({ ...prev, totalOrders: orders.length, pendingDeliveries }))
    }

    if (medicinesResponse.ok) {
      const medicines = await medicinesResponse.json()
      const lowStockAlerts = medicines.filter((m: any) => m.stock < 10).length
      setStats(prev => ({ ...prev, lowStockAlerts }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <Link href="/admin/medicines">
                <Button>Manage Medicines</Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="outline">Manage Orders</Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline">Reports</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDoctors}</div>
              </CardContent>
            </Card>
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
                <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingDeliveries}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.lowStockAlerts}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/medicines">
                  <Button className="w-full justify-start">Add New Medicine</Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline" className="w-full justify-start">Process Orders</Button>
                </Link>
                <Link href="/admin/doctors">
                  <Button variant="outline" className="w-full justify-start">Manage Doctors</Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="outline" className="w-full justify-start">Generate Reports</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">New doctor registered</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #1234 delivered</p>
                      <p className="text-sm text-gray-600">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Low stock alert: Paracetamol</p>
                      <p className="text-sm text-gray-600">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}