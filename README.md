# 💸 Expense Tracker
<img width="1079" height="911" alt="image" src="https://github.com/user-attachments/assets/b8d34614-33e1-41c3-bccf-93ed5064e55f" />

A full-stack web application to track daily expenses with support for manual entry and bulk upload using CSV/Excel (ETL pipeline).

---

## 🚀 Features

* 🔐 User Authentication (Signup & Login)
* ➕ Add expenses manually
* 📂 Bulk upload using CSV / Excel
* 🔄 ETL Pipeline (Extract → Transform → Load)
* 📊 View all expenses in a clean dashboard
* 🧹 Data validation (handles missing & invalid data)
* 👤 User-specific expense tracking

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS (Custom UI)

### Backend

* Flask (Python)
* REST APIs

### Database

* MySQL

### Other

* Pandas (for ETL processing)
* OpenPyXL (Excel support)

---

## 📁 Project Structure

expense-tracker/
│
├── backend/
│   ├── app.py
│   ├── db_config.py
│   ├── db_init.py
│   ├── etl_pipeline.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/akashruttala/expense-tracker.git
cd expense-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 4️⃣ Database Setup (MySQL)

```sql
CREATE DATABASE expense_db;

USE expense_db;

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    amount INT,
    date DATE,
    type VARCHAR(100)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255)
);
```

---

## 📂 Sample CSV Format (for ETL)

```csv
title,amount,date,type
Food,200,2026-04-01,Daily
Taxi,300,2026-04-02,Transport
Shopping,1500,2026-04-03,Other
```

---

## 🔄 ETL Process

* **Extract** → Read CSV/Excel file
* **Transform** → Clean data, handle missing/invalid values
* **Load** → Store into MySQL database

---

## 📸 Screenshots
<img width="1638" height="1110" alt="image" src="https://github.com/user-attachments/assets/535b055d-fcf0-43ae-a315-4d7b742e72dd" />
<img width="529" height="778" alt="image" src="https://github.com/user-attachments/assets/5a0692e8-a964-4ac8-8879-c26fe374f99c" />
<img width="1106" height="967" alt="image" src="https://github.com/user-attachments/assets/9ee1b851-06a1-4f8a-afb7-fb7311892403" />
<img width="1079" height="911" alt="image" src="https://github.com/user-attachments/assets/6a3dfb12-d82a-417a-911d-2984fae0df25" />


---

## 🎯 Future Improvements

* Expense analytics (charts)
* Category-wise filtering
* Monthly reports
* Export data as PDF

---

## 👨‍💻 Author

**Akash Ruttala**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
