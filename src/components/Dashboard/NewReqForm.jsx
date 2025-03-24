"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function RequestForm() {
  // Form state
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

  // Validation state
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
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Form header */}
      <div className="bg-[#0066a1] text-white px-6 py-4">
        <h2 className="text-xl font-semibold">New Request Form</h2>
      </div>

      {submitted ? (
        <div className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Request Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">Thank you for your submission. We will get back to you shortly.</p>
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
            className="bg-[#0066a1] text-white px-6 py-2 rounded-md hover:bg-[#00558c] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-0">
          {/* Client Details Section */}
          <div className="border-b border-gray-200 py-2 px-6">
            <h3 className="text-[#cc0000] text-lg font-medium">Client Details</h3>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Contact Person <span className="text-[#cc0000]">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.contactPerson ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]`}
                />
                {errors.contactPerson && (
                  <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contactPerson}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Firm Name</label>
                <input
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]"
                />
              </div>
            </div>
          </div>

          {/* Correspondence Address Section */}
          <div className="mx-6 mb-6 border border-gray-200 rounded-md">
            <div className="border-b border-gray-200 py-2 px-4">
              <h3 className="text-[#cc0000] text-lg font-medium">Correspondence Address</h3>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  Address(C) <span className="text-[#cc0000]">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.address ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1] h-24`}
                ></textarea>
                {errors.address && (
                  <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    City(C) <span className="text-[#cc0000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.city ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]`}
                  />
                  {errors.city && (
                    <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    State(C) <span className="text-[#cc0000]">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.state ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1] h-[42px]`}
                  >
                    <option value="">-Select-</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    {/* Add more states as needed */}
                  </select>
                  {errors.state && (
                    <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Pin Code(C) <span className="text-[#cc0000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.pinCode ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]`}
                  />
                  {errors.pinCode && (
                    <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.pinCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Register Mobile <span className="text-[#cc0000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.mobile ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]`}
                  />
                  {errors.mobile && (
                    <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.mobile}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Register Email Id <span className="text-[#cc0000]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.email ? "border-[#cc0000]" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066a1]`}
                />
                {errors.email && (
                  <p className="text-[#cc0000] text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 pb-6 flex justify-end gap-3">
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
              className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0066a1] text-white rounded-md hover:bg-[#00558c] transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

