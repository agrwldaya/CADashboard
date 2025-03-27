"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, MapPin, User, Mail, Phone, Building2 ,RefreshCw} from "lucide-react"

export default function RequestForm() {
  const [formData, setFormData] = useState({
    contactPerson: "",
    firmName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    mobile: "",
    email: "",
  })

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    const requiredFields = ["contactPerson", "address", "city", "state", "pinCode", "mobile", "email"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      setSubmitted(true)
      // Here you would typically send the data to your server
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
      {/* Form header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
           
          <h2 className="text-2xl  font-bold">New Request Form</h2>
        </div>
        <div className="text-sm text-blue-200 bg-blue-700/30 px-3 py-1 rounded-full">
          Request ID: {Math.floor(Math.random() * 10000)}
        </div>
      </div>

      {submitted ? (
        <div className="p-12 text-center bg-gray-50">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Request Submitted Successfully!</h3>
          <p className="text-gray-600 mb-8 text-lg">Thank you for your submission. Our team will review and get back to you shortly.</p>
          <button
            onClick={() => {
              setFormData({
                contactPerson: "",
                firmName: "",
                address: "",
                city: "",
                state: "",
                pinCode: "",
                mobile: "",
                email: "",
              })
              setSubmitted(false)
            }}
            className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-md flex items-center mx-auto space-x-2"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-0">
          {/* Client Details Section */}
          <div className="bg-blue-50 border-b border-blue-100 py-4 px-6 flex items-center">
            <User className="w-6 h-6 text-blue-700 mr-3" />
            <h3 className="text-xl font-semibold border-gray-200 hover:bg-gray-100">Client Details</h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Person <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.contactPerson ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contactPerson}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Firm Name
                </label>
                <input
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Correspondence Address Section */}
          <div className="mx-6 mb-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="bg-blue-50 border-b border-gray-200 py-4 px-6 flex items-center">
              <MapPin className="w-6 h-6 text-blue-700 mr-3" />
              <h3 className="text-xl font-semibold text-blue-800">Correspondence Address</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Rest of the form remains the same, with minor styling updates */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Address(C) <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24`}
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Other fields with similar styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    City(C) <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    State(C) <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  >
                    <option value="">-Select-</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              {/* Pin Code and Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Pin Code(C) <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.pinCode ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                  {errors.pinCode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.pinCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-blue-600" />
                    Register Mobile <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.mobile}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Register Email Id <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 pb-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  contactPerson: "",
                  firmName: "",
                  address: "",
                  city: "",
                  state: "",
                  pinCode: "",
                  mobile: "",
                  email: "",
                })
                setErrors({})
              }}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  )
}