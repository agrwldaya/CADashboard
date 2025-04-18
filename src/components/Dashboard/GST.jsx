"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Save, Upload, Download, Search, Edit, Plus, X, Trash2, Settings } from "lucide-react"

const GST = () => {
  const [moduleData, setModuleData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newRecord, setNewRecord] = useState({
    srNo: "",
    name: "",
    mobile: "",
    email: "",
    aadhar: "",
    pan: "",
    assessmentYear: "",
    gstin: "",
    eFilingStatus: "",
    amount: "",
    feeStatus: "",
    userId: "",
    password: "",
    itrAck: [], // Changed to array
    remark: "",
  })
  const [editingIndex, setEditingIndex] = useState(null)

  // Define all available column names
  const columns = [
    { name: "srNo", label: "Sr. No" },
    { name: "name", label: "Name" },
    { name: "mobile", label: "Mobile" },
    { name: "email", label: "Email" },
    { name: "aadhar", label: "Aadhar" },
    { name: "pan", label: "PAN" },
    { name: "assessmentYear", label: "Assessment Year" },
    { name: "gstin", label: "GSTIN" },
    { name: "eFilingStatus", label: "E-Filing Status" },
    { name: "amount", label: "Amount" },
    { name: "feeStatus", label: "Fee Status" },
    { name: "userId", label: "User ID" },
    { name: "password", label: "Password" },
    { name: "itrAck", label: "ITR Ack" },
    { name: "remark", label: "Remark" },
  ]

  const [showForm, setShowForm] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState(columns.map((col) => col.name))

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const binaryStr = event.target.result
        const workbook = XLSX.read(binaryStr, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const rawData = XLSX.utils.sheet_to_json(sheet)

        // Map the imported data to match our structure
        const formattedData = rawData.map((item) => ({
          srNo: item["Sr.No"] || item["srNo"] || "",
          name: item["Name"] || item["name"] || "",
          mobile: item["Mobile"] || item["mobile"] || "",
          email: item["Email"] || item["email"] || "",
          aadhar: item["Aadhar"] || item["aadhar"] || "",
          pan: item["PAN"] || item["pan"] || "",
          assessmentYear: item["A/Y"] || item["assessmentYear"] || "",
          gstin: item["GSTIN"] || item["gstin"] || "",
          eFilingStatus: item["E-filing Status"] || item["eFilingStatus"] || "",
          amount: item["Amount"] || item["amount"] || "",
          feeStatus: item["Fee Status"] || item["feeStatus"] || "",
          userId: item["User ID"] || item["userId"] || "",
          password: item["Password"] || item["password"] || "",
          itrAck: item["Acknowledgement Sign"] || item["acknowledgementsign"] || "",
          remark: item["Remark"] || item["remark"] || "",
        }))

        setModuleData(formattedData)
        setHasChanges(true)
      }
      reader.readAsBinaryString(file)
    }
  }

  const handleExport = () => {
    // Format data for export
    const exportData = moduleData.map((item) => ({
      "Sr.No": item.srNo,
      Name: item.name,
      Mobile: item.mobile,
      Email: item.email,
      Aadhar: item.aadhar,
      PAN: item.pan,
      GSTIN: item.gstin,
      "A/Y": item.assessmentYear,
      "E-filing Status": item.eFilingStatus,
      Amount: item.amount,
      "Fee Status": item.feeStatus,
      "User ID": item.userId,
      Password: item.password,
      "ITR Ack": item.itrAck,
      Remark: item.remark,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "GST")

    // Set column widths
    const maxWidth = 20
    const colWidths = (worksheet["!cols"] = [])
    Object.keys(exportData[0] || {}).forEach(() => {
      colWidths.push({ wch: maxWidth })
    })

    XLSX.writeFile(workbook, "GST.xlsx")
  }

  // Handle column selection in settings
  const handleColumnCheckboxChange = (columnName) => {
    setSelectedColumns((prev) => {
      if (prev.includes(columnName)) {
        return prev.filter((col) => col !== columnName)
      } else {
        return [...prev, columnName]
      }
    })
  }

  // Save column selection settings
  const handleSaveColumnSettings = () => {
    // If no columns are selected, select all columns to prevent empty table
    if (selectedColumns.length === 0) {
      setSelectedColumns(columns.map((col) => col.name))
    }
    setShowForm(false)
  }

  const handleSaveChanges = async () => {
    setIsLoading(true)
    try {
      // Simulated save operation
      console.log("Saving data:", moduleData)
      setHasChanges(false)
    } catch (error) {
      console.error("Error saving data:", error)
    }
    setIsLoading(false)
  }

  const handleAddNew = () => {
    setNewRecord({
      srNo: moduleData.length + 1,
      name: "",
      mobile: "",
      email: "",
      aadhar: "",
      pan: "",
      gstin: "",
      assessmentYear: "",
      eFilingStatus: "",
      amount: "",
      feeStatus: "",
      userId: "",
      password: "",
      itrAck: [], // Changed to array
      remark: "",
    })
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setNewRecord({
      srNo: "",
      name: "",
      mobile: "",
      email: "",
      aadhar: "",
      pan: "",
      gstin: "",
      assessmentYear: "",
      eFilingStatus: "",
      amount: "",
      feeStatus: "",
      userId: "",
      password: "",
      itrAck: [], // Changed to array
      remark: "",
    })
    setEditingIndex(null)
  }

  const handleModalSave = () => {
    if (editingIndex !== null) {
      // Edit existing record
      const updatedData = [...moduleData]
      updatedData[editingIndex] = newRecord
      setModuleData(updatedData)
    } else {
      // Add new record
      setModuleData([...moduleData, newRecord])
    }
    setHasChanges(true)
    handleModalClose()
  }

  const handleEdit = (index) => {
    setNewRecord(moduleData[index])
    setEditingIndex(index)
    setShowModal(true)
  }

  const filteredData = moduleData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedData = moduleData.filter((_, i) => i !== index)

      const reindexedData = updatedData.map((item, i) => ({
        ...item,
        srNo: i + 1,
      }))

      setModuleData(reindexedData)
      setHasChanges(true)
    }
  }

  const renderFileInput = (id, value, onChange) => (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <input
          type="file"
          onChange={onChange}
          className="hidden"
          id={id}
          multiple // Enable multiple file selection
        />
        <label htmlFor={id} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer">
          Choose Files
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(value) && value.length > 0 ? (
          value.map((file, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <span className="text-sm text-gray-600">{file}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  const newFiles = value.filter((_, i) => i !== index)
                  setNewRecord((prev) => ({
                    ...prev,
                    [id.replace("file-", "")]: newFiles,
                  }))
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-500">No files chosen</span>
        )}
      </div>
    </div>
  )

  const handleFileChange = (fieldName) => (e) => {
    const files = Array.from(e.target.files)
    const fileNames = files.map((file) => file.name)

    setNewRecord((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ...fileNames],
    }))
  }

  // Filter columns based on user selection
  const visibleColumns = columns.filter((column) => selectedColumns.includes(column.name))

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 md:p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-4">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
              {filteredData.length} Records
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddNew}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add New
            </button>
            <input type="file" accept=".xlsx,.xls" onChange={handleImport} className="hidden" id="fileInput" />
            <label
              htmlFor="fileInput"
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer flex items-center"
            >
              <Download size={16} className="mr-2" />
              Import
            </label>
            <button
              onClick={handleExport}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <Upload size={16} className="mr-2" />
              Export
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors duration-200"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>

            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200 flex items-center"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute right-3 top-2.5 text-green-200" size={20} />
          </div>
        </div>
      </div>

      {/* Settings Modal for Column Selection */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-xl font-bold mb-4">Select Columns to Display</h2>

            {/* Column Selection Grid */}
            <div className="grid grid-cols-3 gap-4">
              {columns.map((column) => (
                <label key={column.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column.name)}
                    onChange={() => handleColumnCheckboxChange(column.name)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">{column.label}</span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveColumnSettings}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white table-auto md:table-fixed">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Select</th>
              {visibleColumns.map((column) => (
                <th key={column.name} className="py-3 px-6 text-left">
                  {column.label}
                </th>
              ))}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                </td>
                {visibleColumns.map((column) => (
                  <td key={column.name} className="py-3 px-6 text-left whitespace-nowrap">
                    {row[column.name] || "-"}
                  </td>
                ))}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="transform hover:text-purple-500 hover:scale-110"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="transform hover:text-red-500 hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingIndex !== null ? "Edit Record" : "Add New Record"}
              </h3>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
                <input
                  type="text"
                  value={newRecord.mobile}
                  onChange={(e) => setNewRecord({ ...newRecord, mobile: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={newRecord.email}
                  onChange={(e) => setNewRecord({ ...newRecord, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Aadhar</label>
                <input
                  type="text"
                  value={newRecord.aadhar}
                  onChange={(e) => setNewRecord({ ...newRecord, aadhar: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">PAN</label>
                <input
                  type="text"
                  value={newRecord.pan}
                  onChange={(e) => setNewRecord({ ...newRecord, pan: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
                <input
                  type="text"
                  value={newRecord.userId}
                  onChange={(e) => setNewRecord({ ...newRecord, userId: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="text"
                  value={newRecord.password}
                  onChange={(e) => setNewRecord({ ...newRecord, password: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Assessment Year</label>
                <select
                  value={newRecord.assessmentYear}
                  onChange={(e) => setNewRecord({ ...newRecord, assessmentYear: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select...</option>
                  <option value="2020-21">2020-21</option>
                  <option value="2021-22">2021-22</option>
                  <option value="2022-23">2022-23</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">GSTIN</label>
                <select
                  value={newRecord.gstin}
                  onChange={(e) => setNewRecord({ ...newRecord, gstin: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select GST Type</option>
                  <option value="GSTR-1">GSTR-1</option>
                  <option value="GSTR-3B">GSTR-3B</option>
                  <option value="GSTR-9">GSTR-9</option>
                  <option value="GSTR-9C">GSTR-9C</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">E-filing Status</label>
                <select
                  value={newRecord.eFilingStatus}
                  onChange={(e) => setNewRecord({ ...newRecord, eFilingStatus: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select...</option>
                  <option value="Filed">Filed</option>
                  <option value="Not Filed">Not Filed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input
                  type="number"
                  value={newRecord.amount}
                  onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Fee Status</label>
                <select
                  value={newRecord.feeStatus}
                  onChange={(e) => setNewRecord({ ...newRecord, feeStatus: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select...</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Acknowledgement Sign</label>
                {renderFileInput("file-itrAck", newRecord.itrAck, handleFileChange("itrAck"))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Remark</label>
                <input
                  type="text"
                  value={newRecord.remark}
                  onChange={(e) => setNewRecord({ ...newRecord, remark: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleModalSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GST

