'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Medicine {
  id: string
  name: string
  company: string
  rate: number
  mrp: number
  stock: number
  category: string
  expiryDate: string
}

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    const response = await fetch('/api/medicines')
    if (response.ok) {
      const data = await response.json()
      setMedicines(data)
    }
  }

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || medicine.category === selectedCategory)
  )

  const categories = [...new Set(medicines.map(m => m.category))]

  const addToCart = (medicineId: string) => {
    setCart(prev => ({ ...prev, [medicineId]: (prev[medicineId] || 0) + 1 }))
  }

  const removeFromCart = (medicineId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  const placeOrder = async () => {
    const items = Object.entries(cart).map(([medicineId, quantity]) => ({
      medicineId,
      quantity,
    }))

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })

    if (response.ok) {
      alert('Order placed successfully!')
      setCart({})
      fetchMedicines() // Refresh stock
    } else {
      alert('Failed to place order')
    }
  }

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Medicine Catalogue</h1>
            <div className="flex items-center space-x-4">
              <span className="text-lg">Cart: {totalItems} items</span>
              {totalItems > 0 && (
                <Button onClick={placeOrder}>Place Order</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <p className="text-sm text-gray-600">{medicine.company}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Category: {medicine.category}</p>
                    <p className="text-sm">Rate: ₹{medicine.rate}</p>
                    <p className="text-sm">MRP: ₹{medicine.mrp}</p>
                    <p className={`text-sm ${medicine.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      Stock: {medicine.stock}
                    </p>
                    <p className="text-sm">Expiry: {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Button
                      onClick={() => removeFromCart(medicine.id)}
                      disabled={!cart[medicine.id]}
                      size="sm"
                      variant="outline"
                    >
                      -
                    </Button>
                    <span className="px-2">{cart[medicine.id] || 0}</span>
                    <Button
                      onClick={() => addToCart(medicine.id)}
                      disabled={medicine.stock <= (cart[medicine.id] || 0)}
                      size="sm"
                    >
                      +
                    </Button>
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