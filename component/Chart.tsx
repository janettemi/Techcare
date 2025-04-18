"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

const BloodPressureChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Systolic",
        data: [120, 125, 118, 130, 128, 160],
        borderColor: "#C26EB4",
        backgroundColor: "#C26EB4",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Diastolic",
        data: [80, 82, 78, 85, 84, 70],
        borderColor: "#7E6CAB",
        backgroundColor: "#7E6CAB",
        fill: false,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 60,
        suggestedMax: 180,
      },
    },
  }

  return (
    <div className="flex items-start gap-6">
      <div className="w-full max-w-[450px]">
        <Line data={data} options={options} />
      </div>
      <div className="flex flex-col gap-6">
        {/* Systolic */}
        <div className="flex flex-col gap-3" >
          <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#C26EB4] inline-block" />
          <p className="text-sm font-semibold flex items-center gap-1">Systolic</p>
          </div>
            <h2 className="text-sm font-semibold">160 </h2>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <Image src="/icons/expand.png" alt="Expand" height={11} width={6} />
            <p className="text-xs text-gray-500">Higher than Average</p>
            </div>
            
        </div>

        {/* Diastolic */}
        <div className="flex flex-col gap-3" >
          <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#8C6FE6] inline-block" />
          <p className="text-sm font-semibold flex items-center gap-1">Diastolic</p>
          </div>
            <h2 className="text-sm font-semibold">78</h2>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <Image src="/icons/expand.png" alt="Expand" height={11} width={6} />
            <p className="text-xs text-gray-500">Lower than Average</p>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default BloodPressureChart
