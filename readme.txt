🧠 Etap 1: Planowanie funkcjonalności
🎯 Główne funkcje aplikacji:
Formularz do dodawania wydatków (kwota + kategoria).

Dynamiczne wyświetlanie wydatków:

suma z danego dnia,

suma z danego tygodnia.

Wyświetlanie całkowitego wydanego salda.

Diagram kołowy prezentujący procentowy udział wydatków w kategoriach.

🏗️ Etap 2: Architektura aplikacji
📦 Backend (Python, np. Flask lub FastAPI)
Endpointy REST API:

POST /expenses – dodanie nowego wydatku.

GET /expenses/today – pobranie wydatków z dzisiaj.

GET /expenses/week – pobranie wydatków z bieżącego tygodnia.

GET /expenses/summary – zwraca sumę wydatków i ich podział procentowy.

Baza danych (SQLite na początek):

Tabela expenses: id, amount, category, date.

🌐 Frontend (HTML + CSS + czysty JS)
Formularz z polami:

Kwota (input typu number).

Kategoria (select: Jedzenie, Paliwo, Ubrania...).

Przycisk Dodaj.

Sekcje:

Lista wydatków z danego dnia/tygodnia.

Pole z sumą wydatków.

Diagram kołowy (można użyć np. Chart.js lub narysować na canvas).

⚙️ Etap 3: Szczegółowe kroki działania
1. Stworzenie backendu (Python)
Inicjalizacja projektu (venv, Flask lub FastAPI).

Utworzenie bazy danych i modelu danych.

Utworzenie endpointów REST API do pobierania i dodawania wydatków.

Zaimplementowanie logiki obliczającej sumy i procenty.

2. Frontend
Stworzenie prostego UI (HTML/CSS).

Po stronie JS:

Obsługa formularza (pobieranie danych, wysyłka do API).

Pobieranie danych z API (fetch).

Aktualizacja sumy wydatków i tabeli.

Generowanie wykresu (pie chart) na podstawie danych.

3. Integracja front-back
Połączenie frontendu z API (adresy endpointów, testy działania).

Obsługa błędów (walidacja danych, brak połączenia itp.).

4. Testowanie i poprawki
Testowanie działania w różnych przeglądarkach.

Sprawdzenie poprawności sum, wyświetlanych danych i diagramu.

Ulepszanie UI (opcjonalne: tryb ciemny, responsywność itp.).

🚀 Etap 4: Pomysły na rozwój (kolejne wersje)
Rejestracja i logowanie użytkowników.

Możliwość filtrowania wydatków po dacie.

Eksport do CSV lub PDF.

Przypomnienia / alerty o przekroczonym budżecie.

Kategorie dodawane przez użytkownika.

Aplikacja mobilna (np. PWA lub Flutter w przyszłości).