import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Member'
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="glass auth-card animate-fade-in">
        <h2>Create Account</h2>
        <p>Join your team and start tracking tasks</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              name="email"
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Sign Up</button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
