import { UserDashboard } from "@/components/dashboard/user-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <UserDashboard />
        </div>
      </main>
    </div>
  )
}
