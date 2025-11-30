import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import DoctorDashboard from '@/components/DoctorDashboard'
import AdminDashboard from '@/components/AdminDashboard'
import DeliveryDashboard from '@/components/DeliveryDashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const role = session.user.role

  if (role === 'DOCTOR') {
    return <DoctorDashboard />
  } else if (role === 'ADMIN') {
    return <AdminDashboard />
  } else if (role === 'DELIVERY') {
    return <DeliveryDashboard />
  }

  return <div>Unauthorized</div>
}