import React from 'react';

function ExpenseList({ expenses, loading }) {
  
  const getBadgeClass = (type) => {
    const validTypes = ['food', 'travel', 'bills'];
    const normalizedType = String(type).toLowerCase();
    if (validTypes.includes(normalizedType)) {
      return `badge badge-${normalizedType}`;
    }
    return `badge badge-other`;
  };

  return (
    <div className="glass-card">
      <h2>Recent Expenses</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <span className="loading-spinner" style={{ borderColor: 'rgba(59, 130, 246, 0.3)', borderTopColor: '#3b82f6' }}></span>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <h3>No expenses found</h3>
          <p>Start adding expenses to see them here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td style={{ fontWeight: 500 }}>{expense.title}</td>
                  <td>
                    <span className={getBadgeClass(expense.type)}>
                      {expense.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--success-color)' }}>
                    ₹{expense.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
