'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Medicine {
  id: string
  name: string
  company: string
  batchNumber: string
  expiryDate: string
  rate: number
  mrp: number
  stock: number
  category: string
}

export default function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    batchNumber: '',
    expiryDate: '',
    rate: '',
    mrp: '',
    stock: '',
    category: '',
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      alert('Medicine added successfully!')
      setFormData({
        name: '',
        company: '',
        batchNumber: '',
        expiryDate: '',
        rate: '',
        mrp: '',
        stock: '',
        category: '',
      })
      setShowForm(false)
      fetchMedicines()
    } else {
      alert('Failed to add medicine')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Medicine Management</h1>
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add New Medicine'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Medicine</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="batchNumber">Batch Number</Label>
                    <Input
                      id="batchNumber"
                      name="batchNumber"
                      value={formData.batchNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate">Rate</Label>
                    <Input
                      id="rate"
                      name="rate"
                      type="number"
                      step="0.01"
                      value={formData.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mrp">MRP</Label>
                    <Input
                      id="mrp"
                      name="mrp"
                      type="number"
                      step="0.01"
                      value={formData.mrp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Painkiller">Painkiller</option>
                      <option value="Antibiotic">Antibiotic</option>
                      <option value="Antiseptic">Antiseptic</option>
                      <option value="Vitamin">Vitamin</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full">Add Medicine</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <Card key={medicine.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <p className="text-sm text-gray-600">{medicine.company}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Batch: {medicine.batchNumber}</p>
                    <p className="text-sm">Category: {medicine.category}</p>
                    <p className="text-sm">Rate: ₹{medicine.rate}</p>
                    <p className="text-sm">MRP: ₹{medicine.mrp}</p>
                    <p className={`text-sm ${medicine.stock < 10 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                      Stock: {medicine.stock}
                    </p>
                    <p className="text-sm">Expiry: {new Date(medicine.expiryDate).toLocaleDateString()}</p>
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