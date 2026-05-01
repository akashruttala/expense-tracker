import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import FileUpload from './FileUpload';

function Dashboard({ user, apiUrl }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/get-expenses?user_id=${user.id}`);
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  const handleExpenseAdded = () => {
    fetchExpenses();
  };

  const overallTotal = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthTotal = expenses.filter(exp => {
    if (!exp.date) return false;
    // Extract year and month from 'YYYY-MM-DD' to prevent timezone parsing errors
    const [year, month] = exp.date.split('-');
    return parseInt(month, 10) - 1 === currentMonth && parseInt(year, 10) === currentYear;
  }).reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  return (
    <>
      {error && <div className="message error" style={{ marginTop: '1.5rem' }}>{error}</div>}

      <div className="main-content" style={{ marginTop: '1.5rem' }}>
        <div className="sidebar">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} apiUrl={apiUrl} userId={user.id} />
          <div style={{ marginTop: '2rem' }}></div>
          <FileUpload onUploadSuccess={handleExpenseAdded} apiUrl={apiUrl} userId={user.id} />
        </div>
        
        <div className="content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 0.5rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '1.1rem' }}>
              Total This Month: <strong style={{ color: 'var(--success-color)' }}>₹{thisMonthTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</strong>
            </span>
            <span style={{ fontSize: '1.1rem' }}>
              Overall Total: <strong style={{ color: 'var(--primary-color)' }}>₹{overallTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</strong>
            </span>
          </div>
          <ExpenseList expenses={expenses} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
