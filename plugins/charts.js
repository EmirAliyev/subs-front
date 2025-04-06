import {
  Chart,
  Title,
  ArcElement,
  Tooltip,
  LineElement,
  TimeScale,
  PointElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
export default defineNuxtPlugin(() => {
  Chart.register(
    CategoryScale,
    ArcElement,
    TimeScale,
    LineElement,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  )
})
