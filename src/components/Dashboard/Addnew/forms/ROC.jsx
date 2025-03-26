import { useState } from "react";
import { X } from "lucide-react"; // Ensure you have lucide-react installed

const ROC = ({ onClose }) => {
  const [moduleData, setModuleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    srNo: "",
    name: "",
    mobile: "",
    cin: "",
    eFilingStatus: "",
    amount: "",
    feeStatus: "",
    userId: "",
    password: "",
    remark: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleModalSave = () => {
    // Handle save logic here
    console.log("Saving record:", newRecord);
    handleModalClose();
  };

  return (
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
            <label className="block text-gray-700 text-sm font-bold mb-2">CIN</label>
            <input
              type="text"
              value={newRecord.cin}
              onChange={(e) => setNewRecord({ ...newRecord, cin: e.target.value })}
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
  );
};

export default ROC;
