import sqlite3
import random
from datetime import datetime, timedelta
import csv
import matplotlib.pyplot as plt

# Kategorie wydatków
CATEGORIES = ['Jedzenie', 'Paliwo', 'Ubrania', 'Rozrywka', 'Inne']

# Utwórz połączenie z bazą danych
conn = sqlite3.connect('expenses.db')
cursor = conn.cursor()

# Utwórz tabelę, jeśli nie istnieje
cursor.execute('''
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL
    )
''')
conn.commit()

# Wyczyść dane i zresetuj ID
cursor.execute('DELETE FROM expenses')
cursor.execute('DELETE FROM sqlite_sequence WHERE name="expenses"')
conn.commit()

# Generowanie danych: 365 dni, 0–5 wydatków dziennie
start_date = datetime(2024, 1, 1)
for i in range(365):
    current_date = start_date + timedelta(days=i)
    for _ in range(random.randint(0, 5)):
        amount = round(random.uniform(5, 300), 2)
        category = random.choice(CATEGORIES)
        cursor.execute('INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
                       (amount, category, current_date.date().isoformat()))
conn.commit()

# Analiza danych
cursor.execute('SELECT category, SUM(amount) FROM expenses GROUP BY category')
category_summary = cursor.fetchall()

cursor.execute('SELECT SUM(amount) FROM expenses')
total = cursor.fetchone()[0]

print("\n📊 Roczne wydatki:")
print(f"Całkowita suma: {round(total, 2)} zł\n")

print("Podział na kategorie:")
for category, amount in category_summary:
    percent = round((amount / total) * 100, 2)
    print(f" - {category}: {round(amount, 2)} zł ({percent}%)")

# Wykres słupkowy z matplotlib
labels = [cat for cat, _ in category_summary]
values = [amt for _, amt in category_summary]

plt.figure(figsize=(10, 6))
plt.bar(labels, values)
plt.title("Wydatki wg kategorii (słupkowo)")
plt.xlabel("Kategoria")
plt.ylabel("Kwota [zł]")
plt.tight_layout()
plt.show()

# Eksport do CSV
with open('expenses_export.csv', mode='w', newline='', encoding='utf-8') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['ID', 'Amount', 'Category', 'Date'])
    cursor = conn.execute('SELECT * FROM expenses')
    writer.writerows(cursor)

print("\n✅ Dane wyeksportowane do expenses_export.csv")

# Zamknij połączenie
conn.close()
