"use client"
import {  useEffect, useState } from "react";
export default function Home() {
type Expense = {
  amount:number;
  category:string;
}

type Summary={
  total:number;
  by_category:{[key:string]:number}
}

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [todayExpenses, setTodayExpenses] = useState<Expense[]>([])
  const [summary, setSummary] = useState<Summary>({total:0, by_category:{}});

useEffect(() =>{
fetchToday();
fetchSummary();
},[]);

const fetchToday = async () =>{
  const res = await fetch('http://localhost:5000/expenses/today')
  const data = await res.json();
  setTodayExpenses(data);
}

const fetchSummary = async () =>{
  const res = await fetch('http://localhost:5000/expenses/summary');
  const data = await res.json();
  setSummary(data);
}

const handleSubmit = async (e:any) =>{
  e.preventDefault();
  await fetch('http://localhost:5000/expenses',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({amount: parseFloat(amount),category,date})

  });
  setAmount('');
  fetchToday();
  fetchSummary();
};
  
  return (
    <>
    <div className="container mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-8 text-slate-800 min-h-screen">
      {/* Nagłówek */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-6">💸 Kalkulator Finansów</h1>
  
        {/* Formularz */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white text-black p-6 rounded-lg shadow-md">
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
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded transition"
          >
            Dodaj wydatek
          </button>
        </form>
      </div>
  
      {/* Podsumowanie */}
      <div className="md:w-1/2 bg-white text-black p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">📅 Dzisiejsze Wydatki</h2>
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
  </>
  
  );
}
