import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PostPropertyForm = () => {
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    propertyType: '',
    bhkType: '',
    monthlyRent: '',
    securityDeposit: '',
    numberOfRoommates: '',
    propertyImages: []
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = files.filter(file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);

    if (validImageFiles.length + formData.propertyImages.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }

    setFormData(prev => ({ 
      ...prev, 
      propertyImages: [...prev.propertyImages, ...validImageFiles] 
    }));

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      propertyImages: prev.propertyImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode || !/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.bhkType) newErrors.bhkType = 'BHK type is required';
    if (!formData.monthlyRent || isNaN(formData.monthlyRent) || formData.monthlyRent <= 0) newErrors.monthlyRent = 'Valid monthly rent is required';
    if (!formData.securityDeposit || isNaN(formData.securityDeposit) || formData.securityDeposit <= 0) newErrors.securityDeposit = 'Valid security deposit is required';
    if (!formData.numberOfRoommates) newErrors.numberOfRoommates = 'Number of roommates is required';
    if (formData.propertyImages.length === 0) newErrors.propertyImages = 'At least one property image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to a backend service
      console.log(formData);
      navigate('/');
    }
  };

  return (
    <div className="bg-beige min-h-screen flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Post Your Property</h1>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Street Address</label>
          <input 
            type="text" 
            name="streetAddress" 
            value={formData.streetAddress} 
            onChange={handleChange}
            className={`w-full p-2 border ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
            placeholder="Flat/House No., Street" 
          />
          {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold mb-1">City</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
              placeholder="City" 
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">State</label>
            <input 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
              placeholder="State" 
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold mb-1">Pincode</label>
            <input 
              type="text" 
              name="pincode" 
              value={formData.pincode} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
              placeholder="6-digit Pincode" 
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Property Type</label>
            <select 
              name="propertyType" 
              value={formData.propertyType} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`}
            >
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
            </select>
            {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold mb-1">BHK Type</label>
            <select 
              name="bhkType" 
              value={formData.bhkType} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.bhkType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`}
            >
              <option value="">Select BHK Type</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              <option value="3+bhk">3+ BHK</option>
            </select>
            {errors.bhkType && <p className="text-red-500 text-xs mt-1">{errors.bhkType}</p>}
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Number of Roommates</label>
            <select 
              name="numberOfRoommates" 
              value={formData.numberOfRoommates} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.numberOfRoommates ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`}
            >
              <option value="">Select Roommates</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3+">3+</option>
            </select>
            {errors.numberOfRoommates && <p className="text-red-500 text-xs mt-1">{errors.numberOfRoommates}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold mb-1">Monthly Rent</label>
            <input 
              type="number" 
              name="monthlyRent" 
              value={formData.monthlyRent} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.monthlyRent ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
              placeholder="Monthly Rent" 
            />
            {errors.monthlyRent && <p className="text-red-500 text-xs mt-1">{errors.monthlyRent}</p>}
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Security Deposit</label>
            <input 
              type="number" 
              name="securityDeposit" 
              value={formData.securityDeposit} 
              onChange={handleChange}
              className={`w-full p-2 border ${errors.securityDeposit ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-cherryRed focus:outline-none`} 
              placeholder="Security Deposit" 
            />
            {errors.securityDeposit && <p className="text-red-500 text-xs mt-1">{errors.securityDeposit}</p>}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Property Images</h2>
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-black rounded-lg cursor-pointer bg-beige hover:bg-gray-200">
            <p className="text-black">Click to upload or drag and drop (Max 5 images)</p>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </label>
          {errors.propertyImages && <p className="text-red-500 text-xs mt-1">{errors.propertyImages}</p>}

          {formData.propertyImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {formData.propertyImages.map((file, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-md" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)} 
                    className="absolute top-1 right-1 bg-cherryRed text-white rounded-full px-2 py-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-cherryRed text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
        >
          Post Property
        </button>
      </form>
    </div>
  );
};

export default PostPropertyForm;