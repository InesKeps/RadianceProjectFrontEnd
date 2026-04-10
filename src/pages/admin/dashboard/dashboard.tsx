import { ChartAreaConsultation } from "@/components/chart-area-consultation";
import { ChartBarMotifs } from "@/components/chart-bar-motifs";
import { ChartBarSoins } from "@/components/chart-bar-soins";
import { SectionCards } from "@/components/section-cards"


const Dashboard = () =>{
    return(
        <section>
          <h1 className="font-medium text-xl px-6">Dashboard</h1>
          <SectionCards />
          <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 w-full">
            <div className="flex gap-4">
              <ChartBarSoins/>
              <ChartBarMotifs/>
            </div>
            <ChartAreaConsultation />
          </div>
        </section>
    )
}

export default Dashboard;