import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Save, Upload, Download, Search, Edit, Plus, X, Trash2, FileText, Settings } from 'lucide-react';

const Audit = () => {
  const [moduleData, setModuleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    srNo: '',
    name: '',
    mobile: '',
    email: '',
    aadhar: '',
    pan: '',
    assessmentYear: '',
    eFilingStatus: '',
    feeStatus: '',
    amount: '',
    userId: '',
    password: '',
    attachments: [],  // Changed to array
    remark: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);


  const [showForm, setShowForm] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "srNo", "name", "mobile", "aadhar", "pan", "assessmentYear",
    "eFilingStatus", "amount", "feeStatus", "userId", "password",
    "attachments", "remark"
  ];
  const [displayedColumns, setDisplayedColumns] = useState(categories);
  // function for showing the user selection category

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  
  const handleSaveChanges2 = () => {
    setDisplayedColumns(selectedCategories);
    setShowForm(false); // Close modal after saving changes
  };


  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        // Map the imported data to match our structure
        const formattedData = rawData.map(item => ({
          srNo: item['Sr.No'] || item['srNo'] || '',
          name: item['Name'] || item['name'] || '',
          mobile: item['Mobile'] || item['mobile'] || '',
          email: item['Email'] || item['email'] || '',
          aadhar: item['Aadhar'] || item['aadhar'] || '',
          pan: item['PAN'] || item['pan'] || '',
          assessmentYear: item['A/Y'] || item['assessmentYear'] || '',
          eFilingStatus: item['E-filing Status'] || item['eFilingStatus'] || '',
          amount: item['Amount'] || item['amount'] || '',
          feeStatus: item['Fee Status'] || item['feeStatus'] || '',
          userId: item['User ID'] || item['userId'] || '',
          password: item['Password'] || item['password'] || '',
          attachments: item['Attachments'] || item['attachments'] || '',
          remark: item['Remark'] || item['remark'] || ''
        }));

        setModuleData(formattedData);
        setHasChanges(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = () => {
    // Format data for export
    const exportData = moduleData.map(item => ({
      'Sr.No': item.srNo,
      'Name': item.name,
      'Mobile': item.mobile,
      'Email': item.email,
      'Aadhar': item.aadhar,
      'PAN': item.pan,
      'A/Y': item.assessmentYear,
      'E-filing Status': item.eFilingStatus,
      'Amount': item.amount,
      'Fee Status': item.feeStatus,
      'User ID': item.userId,
      'Password': item.password,
      'Attachments': item.attachments,
      'Remark': item.remark
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Audit');

    // Set column widths
    const maxWidth = 20;
    const colWidths = worksheet['!cols'] = [];
    Object.keys(exportData[0] || {}).forEach(() => {
      colWidths.push({ wch: maxWidth });
    });

    XLSX.writeFile(workbook, 'Audit.xlsx');
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulated save operation
      console.log('Saving data:', moduleData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
    setIsLoading(false);
  };

  const handleAddNew = () => {
    setNewRecord({
      srNo: moduleData.length + 1,
      name: '',
      mobile: '',
      email: '',
      aadhar: '',
      pan: '',
      assessmentYear: '',
      eFilingStatus: '',
      amount: '',
      feeStatus: '',
      userId: '',
      password: '',
      attachments: [],  // Changed to array
      remark: ''
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewRecord({
      srNo: '',
      name: '',
      mobile: '',
      email: '',
      aadhar: '',
      pan: '',
      assessmentYear: '',
      eFilingStatus: '',
      amount: '',
      feeStatus: '',
      userId: '',
      password: '',
      attachments: [],  // Changed to array
      remark: ''
    });
    setEditingIndex(null);
  };

  const handleModalSave = () => {
    if (editingIndex !== null) {
      // Edit existing record
      const updatedData = [...moduleData];
      updatedData[editingIndex] = newRecord;
      setModuleData(updatedData);
    } else {
      // Add new record
      setModuleData([...moduleData, newRecord]);
    }
    setHasChanges(true);
    handleModalClose();
  };

  const handleEdit = (index) => {
    setNewRecord(moduleData[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const filteredData = moduleData.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedData = moduleData.filter((_, i) => i !== index);

      const reindexedData = updatedData.map((item, i) => ({
        ...item,
        srNo: i + 1,
      }));

      setModuleData(reindexedData);
      setHasChanges(true);
    }
  };

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
        <label
          htmlFor={id}
          className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 cursor-pointer transition-colors duration-300 flex items-center gap-2"
        >
          <FileText size={16} />
          Choose Files
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(value) && value.length > 0 ? (
          value.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-indigo-50 px-2 py-1 rounded border border-indigo-100 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <span className="text-sm text-indigo-600">{file}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const newFiles = value.filter((_, i) => i !== index);
                  setNewRecord(prev => ({
                    ...prev,
                    [id.replace('file-', '')]: newFiles
                  }));
                }}
                className="ml-2 text-indigo-400 hover:text-indigo-700 transition-colors duration-300"
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
  );

  const handleFileChange = (fieldName) => (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name);

    setNewRecord(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ...fileNames]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden ">

      <div className="p-3 md:p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-4">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold shadow-inner">
              {filteredData.length} Records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddNew}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 transform flex items-center shadow-md"
            >
              <Plus size={16} className="mr-2" />
              Add New
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-all duration-300 transform cursor-pointer flex items-center shadow-md"
            >
              <Download size={16} className="mr-2" />
              Import
            </label>
            <button
              onClick={handleExport}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform flex items-center shadow-md"
            >
              <Upload size={16} className="mr-2" />
              Export
            </button>


            <div>
              {/* Settings Button */}
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors duration-200"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>

              {/* Full-Screen Form Modal */}
              {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                    <h2 className="text-xl font-bold mb-4">Select Categories</h2>

                    {/* Category Grid (3 columns per row) */}
                    <div className="grid grid-cols-3 gap-4">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category)}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
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
                        onClick={handleSaveChanges2}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className={`bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform flex items-center shadow-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <Save size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
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
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 shadow-inner"
            />
            <Search className="absolute right-3 top-2.5 text-blue-100" size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white table-auto md:table-fixed">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Select</th>
              {displayedColumns.map((column) => (
                <th key={column} className="py-3 px-6 text-left">{column}</th>
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
                {displayedColumns.map((column) => (
                  <td key={column} className="py-3 px-6 text-left whitespace-nowrap">
                    {row[column] || '-'}
                  </td>
                ))}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => handleEdit(index)} className="transform hover:text-purple-500 hover:scale-110">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(index)} className="transform hover:text-red-500 hover:scale-110">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">

          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-scaleIn">

            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-indigo-700">
                {editingIndex !== null ? 'Edit Record' : 'Add New Record'}
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">




              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
                <input
                  type="text"
                  value={newRecord.mobile}
                  onChange={(e) => setNewRecord({ ...newRecord, mobile: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={newRecord.email}
                  onChange={(e) => setNewRecord({ ...newRecord, email: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Aadhar</label>
                <input
                  type="text"
                  value={newRecord.aadhar}
                  onChange={(e) => setNewRecord({ ...newRecord, aadhar: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">PAN</label>
                <input
                  type="text"
                  value={newRecord.pan}
                  onChange={(e) => setNewRecord({ ...newRecord, pan: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
                <input
                  type="text"
                  value={newRecord.userId}
                  onChange={(e) => setNewRecord({ ...newRecord, userId: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="text"
                  value={newRecord.password}
                  onChange={(e) => setNewRecord({ ...newRecord, password: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Assessment Year</label>
                <select
                  value={newRecord.assessmentYear}
                  onChange={(e) => setNewRecord({ ...newRecord, assessmentYear: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
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
                <label className="block text-gray-700 text-sm font-bold mb-2">E-filing Status</label>
                <select
                  value={newRecord.eFilingStatus}
                  onChange={(e) => setNewRecord({ ...newRecord, eFilingStatus: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
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
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Fee Status</label>
                <select
                  value={newRecord.feeStatus}
                  onChange={(e) => setNewRecord({ ...newRecord, feeStatus: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select...</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>



              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Attachments</label>
                {renderFileInput('file-attachments', newRecord.attachments, handleFileChange('attachments'))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Remark</label>
                <textarea
                  value={newRecord.remark}
                  onChange={(e) => setNewRecord({ ...newRecord, remark: e.target.value })}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 h-24"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Audit;