# 💸 Kalkulator Finansów

Aplikacja do zarządzania codziennymi wydatkami z przejrzystym interfejsem, wykresem kołowym 📊 i stylem glassmorphism ✨

---

## 📸 Podgląd aplikacji

<img src="screenshot.png" alt="Zrzut ekranu Kalkulatora Finansów" width="900"/>

---

## 🎯 Funkcje aplikacji

✅ Dodawanie wydatków (kwota, kategoria, data)  
✅ Dzisiejsze wydatki w formie listy  
✅ Całkowita suma wydatków  
✅ Procentowy udział kategorii na wykresie kołowym  
✅ Efekt glassmorphism + stylowy interfejs  
✅ Responsywny frontend z Next.js + TailwindCSS  
✅ Prosty backend REST API z Flask + SQLite  

---

## ⚙️ Jak działa aplikacja

- 💾 **Backend (Python, Flask + SQLite)**:
  - `POST /expenses` – dodaje nowy wydatek
  - `GET /expenses/today` – dzisiejsze wydatki
  - `GET /expenses/summary` – suma i udział procentowy

- 💅 **Frontend (Next.js + TailwindCSS)**:
  - Formularz do dodania wydatku
  - Pobieranie danych z API
  - Rysowanie wykresu kołowego (Chart.js)
  - Szklany efekt tła (glassmorphism)

---

## 🔌 Instalacja backendu (Flask)

```bash
# Utwórz i aktywuj środowisko
python3 -m venv venv
source venv/bin/activate

# Zainstaluj wymagane paczki
pip install -r requirements.txt

# Uruchom backend
python3 app.py


