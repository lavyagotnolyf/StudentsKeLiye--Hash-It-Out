import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage=()=>{

  const[isSignUp,setIsSignUp]=useState(false)
  const [formData,setFormData]=useState({
    email:'',
    password:'',
    name:'',
  })


  const navigate=useNavigate();


  const handleChange=(e)=>{
    const {name,value}=e.target 
    setFormData(prev=>({...prev,[name]:value}))
  }

  const validateForm=()=>{
    const newError={}
    if(!formData.email){
      newError.email="email id is required"
    }

    if(!formData.password.length<8){
      newError.password="password must be 8 characters long"
    }
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/auth/${isSignUp ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
  }

  


    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="input" />
                <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="input" />
              </div>
            )}
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="input" />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="input" />
            {isSignUp && (
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="input" />
            )}
            <button type="submit" disabled={loading} className="btn w-full">{loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}</button>
          </form>
          <p className="text-center mt-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-500 hover:underline">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    );
  
}

export default AuthPage;
