'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  mobile: string;
  class: string;
  district: string;
  note: string;
}

const ContactFormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    class: '',
    district: '',
    note: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Section - Blue with Contact Info */}
      <div className="w-full lg:w-1/2 bg-blue-500 relative overflow-hidden">
        {/* Stethoscope background image effect */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-full h-full opacity-20">
            <div className="hidden md:block right-8 lg:right-32 top-1/2 -translate-y-1/2 w-40 h-40 lg:w-80 lg:h-80 absolute">
              {/* Simple circular shapes to mimic stethoscope */}
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white/30 rounded-full"></div>
              <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-white/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border-4 border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white h-full flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-16">Contact Us</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="text-white/90 leading-relaxed text-base">
                K.M. Apartment, Medical College, Jn, near Rahmaniya School, East<br/>
                Devagiri, Velliparamba, Kozhikode, Kerala 673008
              </p>
              <div className="w-full h-px bg-white/40 mt-6"></div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Phone</h2>
              <a href="tel:+919567433033" className="text-white/90 text-base hover:text-white">
                +91 95674 33033
              </a>
              <div className="w-full h-px bg-white/40 mt-6"></div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Email</h2>
              <a href="mailto:bhatiacalicut@gmail.com" className="text-white/90 text-base hover:text-white">
                bhatiacalicut@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - White with Form */}
      <div className="w-full lg:w-1/2 bg-[#F7FAFC] p-6 md:p-10 lg:p-16 flex items-center">
        <div className="w-full max-w-sm mx-auto">
          <div className="space-y-6">
            <div >
              <label className="block text-gray-600 text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={4}
                placeholder="Write your note"
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white resize-none placeholder-gray-400"
              />
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;