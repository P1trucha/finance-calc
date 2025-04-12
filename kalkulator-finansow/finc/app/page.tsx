// 🧭 Komponent Home – kalkulator finansowy z formularzem, podsumowaniem i wykresem
"use client"

import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function Home() {
  type Expense = {
    amount: number;
    category: string;
  }

  type Summary = {
    total: number;
    by_category: { [key: string]: number };
  }

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [todayExpenses, setTodayExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, by_category: {} });

  useEffect(() => {
    fetchToday();
    fetchSummary();
  }, []);

  const fetchToday = async () => {
    const res = await fetch('http://localhost:5000/expenses/today');
    const data = await res.json();
    setTodayExpenses(data);
  }

  const fetchSummary = async () => {
    const res = await fetch('http://localhost:5000/expenses/summary');
    const data = await res.json();
    setSummary(data);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount), category, date })
    });
    setAmount('');
    fetchToday();
    fetchSummary();
  };

  return (
    <>
<div className="bg-white/20 backdrop-blur-lg rounded-4xl shadow-md container mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800 min-h-[70vh] mt-20 relative">

        {/* 📥 Sekcja formularza */}
        <div className=" text-black p-6 rounded-lg flex flex-col justify-between min-h-[400px]">
          <div>
            <h1 className="text-3xl font-semibold mb-6">💸 Kalkulator Finansów</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Kwota"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Jedzenie">Jedzenie</option>
                <option value="Paliwo">Paliwo</option>
                <option value="Ubrania">Ubrania</option>
                <option value="Rozrywka">Rozrywka</option>
              </select>
 
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold py-2 rounded transition"
              >
                Dodaj wydatek
              </button>
            </form>
          </div>
        </div>

        {/* 📋 Sekcja podsumowania wydatków */}
        <div className=" text-black p-6 rounded-lg  flex flex-col justify-between min-h-[400px]">
          <div>
            <h1 className="text-3xl font-semibold mb-4">📅 Dzisiejsze Wydatki</h1>
            <ul className="space-y-2 mb-6">
              {todayExpenses.map((exp, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>{exp.category}</span>
                  <span className="font-medium">{exp.amount} zł</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold">💰 Suma: {summary.total} zł</h2>
          </div>
        </div>

        {/* 🥧 Wykres kołowy z komponentu Chart */}
        {summary && (
          <div className=" text-black p-6 rounded-lg  flex flex-col justify-between min-h-[400px]">
            <Chart data={summary.by_category} />
          </div>
        )}

<div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full opacity-30 blur-3xl z-0"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400 rounded-full opacity-30 blur-3xl z-0"></div>
<div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl z-0"></div>
<div className="absolute top-2/3 right-2/3 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-3xl z-0"></div>

      </div>
    </>
  );
}
