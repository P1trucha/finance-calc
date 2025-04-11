from flask import Flask, request, jsonify  # Flask do obsługi API
from datetime import datetime, date, timedelta  # Daty i czas
from flask_cors import CORS  # Pozwala frontendowi łączyć się z API
import sqlite3 

app = Flask(__name__)
CORS(app)  # Włączenie CORS – potrzebne dla Front-End dla Next.js

# Ścieżka do bazy danych SQLite
DB_PATH = 'expenses.db'

# Funkcja pomocnicza do otwarcia połączenia z bazą
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  
    return conn

# Endpoint POST /expenses – dodaje nowy wydatek do bazy
@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.json
    try:
        amount = float(data['amount']) 
        category = data['category']  
        expense_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    except (KeyError, ValueError):
        return jsonify({'error': 'Nieprawidłowe dane wejściowe'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
        (amount, category, expense_date.isoformat())
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Dodano wydatek'}), 201

# Endpoint GET /expenses/today – zwraca dzisiejsze wydatki
@app.route('/expenses/today', methods=['GET'])
def get_today_expenses():
    today = date.today().isoformat()
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT amount, category FROM expenses WHERE date = ?',
        (today,)
    ).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Endpoint GET /expenses/week – zwraca wydatki z bieżącego tygodnia
@app.route('/expenses/week', methods=['GET']) 
def get_week_expenses():
    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT amount, category FROM expenses WHERE date >= ?',
        (start_of_week.isoformat(),)
    ).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Endpoint GET /expenses/summary – zwraca całkowitą sumę i udział procentowy kategorii
@app.route('/expenses/summary', methods=['GET'])
def get_summary():
    conn = get_db_connection()
    total_row = conn.execute('SELECT SUM(amount) as total FROM expenses').fetchone()
    total = total_row['total'] or 0

    summary_rows = conn.execute(
        'SELECT category, SUM(amount) as amount FROM expenses GROUP BY category'
    ).fetchall()
    conn.close()

    # Obliczenie udziału procentowego dla każdej kategorii
    summary = {
        row['category']: round((row['amount'] / total) * 100, 2) if total > 0 else 0
        for row in summary_rows
    }

    return jsonify({'total': round(total, 2), 'by_category': summary})

if __name__ == '__main__':
    app.run(debug=True)
