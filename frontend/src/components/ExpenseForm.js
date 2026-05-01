import React, { useState, useRef } from 'react';
import axios from 'axios';

function ExpenseForm({ onExpenseAdded, apiUrl, userId }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: 'food'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post(`${apiUrl}/add-expense`, {
        ...formData,
        amount: Number(formData.amount),
        user_id: userId
      });
      setMessage({ type: 'success', text: 'Expense added successfully!' });
      setFormData({ title: '', amount: '', date: '', type: 'food' });
      if (onExpenseAdded) onExpenseAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to add expense' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="e.g., Grocery"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Amount (₹)</label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="e.g., 500"
            min="1"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span 
              style={{ marginRight: '10px', fontSize: '1.2rem', cursor: 'pointer' }} 
              title="Select a date"
              onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
            >📅</span>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="form-control" 
              required 
              style={{ flex: 1 }}
              ref={dateInputRef}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Type</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            className="form-control"
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="bills">Bills</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="loading-spinner"></span> : 'Add Expense'}
        </button>
      </form>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default ExpenseForm;
