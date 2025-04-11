from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date, timedelta
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, default=date.today)

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expense = Expense(
     amout=data['amount'], 
     category=data['category'],
     date=datetime.strptime(data['date'], '%Y-%m-%d').date()
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({'message':'Dodano wydatek'}), 201

@app.route('/expenses/today', methods=['GET'])
def get_today_expenses():
    today = date.today()
    expenses = Expense.query.filter_by(date=today).all()
    return jsonify([{'amount': e.amount, 'category': e.category } for e in expenses])


@app.route('/expenses/week', methods=['GET'])
def get_week_expenses():
    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())
    expenses = Expense.query.filter(Expense.date >= start_of_week).all()
    return jsonify([{'amount': e.amount, 'category':e.category} for e in expenses])


@app.route('/expenses/summary', methods=['GET'])
def get_summary():
    expenses = Expense.query.all()
    total = sum(e.amount for e in expenses)
    summary = {}
    for e in expenses:
        summary[e.category] = summary.get(e.category, 0) + e.amount
    for k in summary:
        summary[k] = round((summary[k]/total)* 100,2)
    return jsonify({'total':total, "by_category":summary})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
