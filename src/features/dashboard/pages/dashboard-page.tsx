import { Notebook, Tag, Truck, Wrench } from "lucide-react"
import { DashboardCard } from "../components/dashboard-card"

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Cards Container - 2x2 grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DashboardCard
            title="Kendaraan Aktif"
            count={3}
            urlLink="daftar-kendaraan"
            icon={Truck}
            className="col-span-1"
            background="bg-secondary"
            text="text-secondary-foreground"
          />

          <DashboardCard
            title="Kendaraan Terjual"
            count={2}
            urlLink="daftar-kendaraan"
            icon={Tag}
            className="col-span-1"
            background="border bg-background"
            text=""
          />

          <DashboardCard
            title="To-do Servis"
            count={4}
            urlLink="servis"
            icon={Wrench}
            className="col-span-1"
            background="bg-tertiary"
            text="text-tertiary-foreground"
          />

          <DashboardCard
            title="To-do Administrasi"
            count={2}
            urlLink="administrasi"
            icon={Notebook}
            className="col-span-1"
            background="bg-quarternary"
            text="text-quarternary-foreground"
          />
        </div>
      </main>
    </div>
  )
}