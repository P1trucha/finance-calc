💸 Kalkulator Finansów – Twoje codzienne wydatki pod kontrolą!
Aplikacja webowa umożliwiająca szybkie dodawanie, przeglądanie i analizę codziennych wydatków. Wykorzystuje nowoczesny frontend (Next.js + Tailwind CSS) i lekki backend (Flask + SQLite), dzięki czemu działa błyskawicznie – lokalnie i bez zbędnych zależności 🚀

🧠 Co potrafi aplikacja?
✅ Dodawanie wydatków – poprzez prosty formularz z kategorią, kwotą i datą
📅 Wyświetlanie dziennych i tygodniowych wydatków
📊 Podsumowanie z wykresem kołowym – udział procentowy wydatków wg kategorii
🗑️ Usuwanie wydatków jednym kliknięciem
🧊 Nowoczesny interfejs – efekt szkła (glassmorphism), gradienty i responsywny design

🏗️ Architektura projektu
📦 Backend: Flask + SQLite
Framework: Flask

Obsługa CORS: flask-cors

Baza danych: SQLite

Wykresy lokalne (dla testów): matplotlib

REST API:

POST /expenses – dodaje nowy wydatek

GET /expenses/today – pobiera dzisiejsze wydatki

GET /expenses/week – pobiera wydatki z tygodnia

GET /expenses/summary – zwraca sumę i procenty

DELETE /expenses/<id> – usuwa wydatek

🌐 Frontend: Next.js + Tailwind CSS
Framework: Next.js (React)

Stylowanie: Tailwind CSS

Wykresy: Chart.js + react-chartjs-2

TypeScript dla typowania

Całość stylowana z wykorzystaniem efektu szkła, gradientów i animacji

🧪 Jak działa?
🔁 Przy uruchomieniu aplikacja:

Łączy się z lokalną bazą danych SQLite

Tworzy tabelę expenses jeśli nie istnieje

Przechowuje dane: id, amount, category, date

📥 Użytkownik dodaje wydatek → dane trafiają do bazy → frontend automatycznie odświeża widok i wykres

📦 Instalacja
✅ Backend (Python)
Plik requirements.txt:

flask               # framework do tworzenia API
flask-cors          # obsługa CORS (dla frontend)
matplotlib          # do generowania wykresów (lokalnie, opcjonalnie)
Instalacja:


pip install -r requirements.txt
✅ Frontend (Next.js + Tailwind)

npm install next react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install chart.js react-chartjs-2
npm install -D typescript @types/react @types/node


