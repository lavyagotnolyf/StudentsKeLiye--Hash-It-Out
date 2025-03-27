import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TenantProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    studentId: '',
    studentIdPicture: null
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, studentIdPicture: file }));
    } else {
      alert('Please upload a valid image (Max size: 5MB)');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.studentId || isNaN(formData.studentId)) newErrors.studentId = 'Valid student ID is required';
    if (!formData.studentIdPicture) newErrors.studentIdPicture = 'Student ID picture is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Tenant Profile</h1>
        
        <div className="mb-4">
          <label className="block font-semibold">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter first name" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter last name" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter address" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Student ID Number</label>
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter student ID number" />
          {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
        </div>

        <div className="mb-6">
          <label className="block font-semibold">Student ID Picture</label>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="w-full p-2 border rounded-md" />
          {errors.studentIdPicture && <p className="text-red-500 text-xs mt-1">{errors.studentIdPicture}</p>}
          {formData.studentIdPicture && (
            <div className="mt-2">
              <img src={URL.createObjectURL(formData.studentIdPicture)} alt="ID Preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Submit Profile</button>
      </form>
    </div>
  );
};

export default TenantProfileForm;
