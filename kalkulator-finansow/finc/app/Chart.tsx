// 🧁 Komponent Chart – wyświetla wykres kołowy na podstawie danych z propsów
'use client'

// 📦 Import komponentu wykresu kołowego z biblioteki react-chartjs-2
import { Pie } from 'react-chartjs-2'

// ⚙️ Import niezbędnych elementów do działania wykresów z chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// ✅ Rejestracja wymaganych elementów (dla Pie Chart)
ChartJS.register(ArcElement, Tooltip, Legend)

type ChartProps = {
  data: { [key: string]: number }
};

// 📊 Komponent przyjmuje dane w formacie: { "Jedzenie": 40, "Paliwo": 30, ... }
export default function Chart({ data }: ChartProps) {
  // 🔤 Kategorie jako etykiety na wykresie (np. Jedzenie, Paliwo)
  const labels = Object.keys(data)

  // 🔢 Wartości procentowe kategorii (np. 45.5, 32.1, ...)
  const values = Object.values(data)


  
  // 📋 Struktura danych zgodna z wymaganiami Chart.js
  const chartData = {
    labels,
    datasets: [
      {
        data: values, // dane liczbowe
        backgroundColor: [ // kolory dla segmentów
          '#3b82f6', // niebieski
          '#10b981', // zielony
          '#facc15', // żółty
          '#ef4444', // czerwony
          '#8b5cf6'  // fioletowy
        ],
        borderWidth: 1 // grubość obramowania segmentów
      }
    ]
  }

  // 🎨 Zwracany JSX – karta z wykresem
  return (
    <div className="rounded-lg p-6 shadow-md w-full text-2xl font-bold">
      <h1>Wydatki według kategorii:</h1>
      <Pie data={chartData} />
    </div>
  )
}
