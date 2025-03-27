import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/Navbar';
import backgroundImage from '../assets/composition-9.png';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/auth/${isSignUp ? 'signup' : 'signin'}` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate(isSignUp ? '/user-details' : '/');
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Something went wrong. Try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 p-10 rounded-xl shadow-lg max-w-md w-full ml-[-5rem] h-[32rem] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 w-full rounded bg-gray-800 text-white" />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 w-full rounded bg-gray-800 text-white" />
            </div>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded bg-gray-800 text-white" />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 w-full rounded bg-gray-800 text-white" />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {isSignUp && (
            <>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="border p-2 w-full rounded bg-gray-800 text-white" />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            </>
          )}
          <button type="submit" disabled={loading} className="bg-indigo-500 text-white p-2 w-full rounded hover:bg-indigo-600 transition">
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-4 text-white">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-400 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
