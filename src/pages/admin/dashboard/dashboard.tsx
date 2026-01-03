import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

const Dashboard = () =>{
    return(
        <>
          <h1 className="font-medium text-xl px-6">Dashboard</h1>
          <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
          <DataTable data={data} />
        </>
    )
}

export default Dashboard;